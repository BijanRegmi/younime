import { z } from "zod"
import { AnimeStatus } from "@prisma/client"

export const playlistSchema = z.object({
	animeId: z.number(),
	epId: z.number(),
	status: z.string().transform((val, ctx) => {
		const statusStr = Object.values(AnimeStatus)

		const idx = statusStr.indexOf(val)

		if (idx == -1) {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_type,
			})
			return z.NEVER
		}

		return statusStr[idx]
	}),
})

export const interactPlaylistSchema = z.object({
	animeId: z.number(),
})
