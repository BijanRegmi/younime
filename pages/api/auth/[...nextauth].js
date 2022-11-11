import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma"
import { comparePassword } from "../../../utils/crypto"

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
					where: { email: creds.email },
					select: {
						id: true,
						name: true,
						image: true,
						password: true,
					},
				})
				if (user === null || !user.password)
					throw new Error("User not registered.")

				if (!comparePassword(creds.password, user.password))
					throw new Error("Invalid password.")

				return user
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	theme: {
		colorScheme: "dark",
		logo: "https://avatars.githubusercontent.com/u/55084653?v=4",
	},
	debug: true,
}

export default NextAuth(authOptions)
