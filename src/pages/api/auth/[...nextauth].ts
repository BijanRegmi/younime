import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compareSync } from "bcryptjs"
import prisma from "@/prisma"

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
			name: "Credentials",
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
			async authorize(creds, req) {
				const user = await prisma.user.findUnique({
					where: { email: creds?.email },
					select: {
						id: true,
						name: true,
						image: true,
						password: true,
					},
				})
				if (user === null || !user.password)
					throw new Error("User not registered.")

				if (!compareSync(creds?.password as string, user.password))
					throw new Error("Invalid password.")

				return user
			},
		}),
	],
	/* callbacks: {
		jwt: async ({ token, user, account, profile, isNewUser }) => {
			if (account) token.provider = account.provider
			if (user) token.id = user.id
			return token
		},
		session: async ({ session, user, token }) => {
			session.user.provider = token.provider
			session.user.id = token.id
			return session
		},
	}, */
	session: {
		strategy: "jwt",
	},
	theme: {
		colorScheme: "dark",
		logo: "https://avatars.githubusercontent.com/u/55084653?v=4",
	},
}

export default NextAuth(authOptions)
