import { PrismaClient } from "@prisma/client"

export async function getSearchList({ prisma }: { prisma: PrismaClient }) {
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
