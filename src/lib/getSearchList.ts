import prisma from "@/prisma"

export async function getSearchList() {
    const result = await prisma.anime.findMany({
        select: {
            id: true,
            title: true,
            alttitle: true,
        },
    })
    return result
}

export type SearchableAnime = NonNullable<
    Awaited<ReturnType<typeof getSearchList>>
>[number]
