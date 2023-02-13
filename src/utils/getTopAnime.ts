import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"

export async function getTopAnime({ prisma }: { prisma: PrismaClient }) {
	const result: CardAnime[] = await prisma.anime.findMany({
		select: {
			id: true,
			title: true,
			score: true,
			studio: true,
			thumbnail: true,
			age_rating: true,
		},
		orderBy: { score: "desc" },
		take: 32,
	})
	return result
}
