import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"

export async function getRandomAnime({ prisma }: { prisma: PrismaClient }) {
	const result: CardAnime[] =
		await prisma.$queryRaw`select id, title, score, studio, thumbnail, age_rating from anime order by random() limit 32;`

	return result
}
