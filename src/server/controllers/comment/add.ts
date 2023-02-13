import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const addCommentSchema = z.object({
	content: z.string().min(1).max(1024),
	spoiler: z.boolean().default(false),
	episodeId: z.number().nonnegative(),
})

export const addCommentProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof addCommentSchema>
	ctx: Context
}) => {
	const { session, prisma } = ctx
	const { content, spoiler, episodeId } = input

	await prisma.comment.create({
		data: {
			content,
			spoiler,
			episode: { connect: { id: episodeId } },
			commenter: { connect: { id: session?.user.id } },
		},
		select: {
			id: true,
			content: true,
			spoiler: true,
			commenter: { select: { name: true, image: true } },
		},
	})

	return { success: true }
}
