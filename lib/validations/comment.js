import { z } from "zod"

export const commentSchema = z.object({
	content: z.string().min(1).max(1024),
	spoiler: z.boolean().default(false),
	episodeId: z.number(),
})

export const interactCommentSchema = z.object({
	id: z.number(),
})
