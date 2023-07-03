import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compareSync } from "bcryptjs"
import prisma from "@/prisma"

declare module "next-auth" {
    interface Session {
        user: {
            provider?: string
            id?: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        provider?: string
        id?: string
    }
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: "login",
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Your email address",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Your password",
                },
            },
            async authorize(creds) {
                const user = await prisma.user.findUnique({
                    where: { email: creds?.email },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        password: true,
                    },
                })
                if (user === null || !user.password)
                    throw new Error("User not registered.")

                if (!compareSync(creds?.password as string, user.password))
                    throw new Error("Invalid password.")

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (account) token.provider = account.provider
            if (user) token.id = user.id
            return token
        },
        session: async ({ session, token }) => {
            session.user.provider = token.provider
            session.user.id = token.id
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
    theme: {
        colorScheme: "dark",
    },
    pages: {
        signIn: "/auth",
    },
}

export default NextAuth(authOptions)
