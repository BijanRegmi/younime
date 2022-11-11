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
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("SignIn callback")
			console.log(user, account, profile, email, credentials)
			return true
		},
		async redirect({ url, baseUrl }) {
			console.log("Redirect callback")
			console.log(url, baseUrl)
			return baseUrl
		},
		async session({ session, user, token }) {
			console.log("Session callback")
			console.log(session, user, token)
			return session
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log("JWT callback")
			console.log(token, user, account, profile, isNewUser)
			return token
		},
	},
}

export default NextAuth(authOptions)
