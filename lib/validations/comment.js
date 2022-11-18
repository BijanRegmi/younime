import { z } from "zod"

// api/comment/add
export const addCommentSchema = z.object({
	content: z.string().min(1).max(1024),
	spoiler: z.boolean().default(false),
	episodeId: z.number(),
})

// api/comment/delete
// api/comment/dislike
// api/comment/edit
// api/comment/like
export const interactCommentSchema = z.object({
	id: z.number(),
	spoiler: z.boolean().optional(),
	content: z.string().min(1).max(1024).optional(),
})

// api/comment/get
export const getCommentSchema = z.object({
	episodeId: z.string().transform(val => Number(val)),
	page: z
		.string()
		.transform(val => Number(val))
		.default(0),
})
