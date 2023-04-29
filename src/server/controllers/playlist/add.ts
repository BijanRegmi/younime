import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { AnimeStatus } from "@prisma/client"

export const addPlaylistSchema = z.object({
    animeId: z.string(),
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
            status,
            user: { connect: { id: session?.user.id as string } },
            anime: { connect: { id: animeId } },
            episode: { connect: { id_animeId: { id: epId, animeId } } },
        },
        update: {
            status,
            epId,
        },
    })

    return { message: "Success" }
}
