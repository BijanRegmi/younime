import { z } from "zod"
import prisma from "@/prisma"

export const registerSchema = z.object({
	email: z
		.string()
		.email()
		.superRefine(async (val, ctx) => {
			const user = await prisma.user.findUnique({
				where: { email: val },
				select: {
					password: true,
					accounts: { select: { provider: true } },
				},
			})

			if (user && user.password) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "User already registered.",
					fatal: true,
				})
				return z.NEVER
			}

			if (user) {
				var s = user.accounts.length ? "s" : ""
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"User already registered with " +
						user.accounts
							.map(account => account.provider)
							.join(", ") +
						` provider${s}.`,
					fatal: true,
				})
				return z.NEVER
			}
		}),
	password: z.string().trim().min(8).max(32),
})
