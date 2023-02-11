import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { AnimeStatus } from "@prisma/client"

export const addPlaylistSchema = z.object({
	animeId: z.number(),
	epId: z.number(),
	status: z.nativeEnum(AnimeStatus),
})

export const addPlaylistProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof addPlaylistSchema>
	ctx: Context
}) => {
	const { animeId, epId, status } = input
	const { prisma, session } = ctx

	await prisma.history_entry.upsert({
		where: {
			userId_animeId: {
				userId: session?.user.id as string,
				animeId,
			},
		},
		create: {
			user: { connect: { id: session?.user.id } },
			anime: { connect: { id: animeId } },
			episode: { connect: { id: epId } },
			status,
		},
		update: {
			status,
			epId,
		},
	})

	return { message: "Success" }
}
