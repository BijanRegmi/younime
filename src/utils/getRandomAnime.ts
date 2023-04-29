import { PrismaClient } from "@prisma/client"
import { CardAnime } from "@/index"

export async function getRandomAnime({ prisma }: { prisma: PrismaClient }) {
    const result: CardAnime[] =
        await prisma.$queryRaw`select id, title, score, type, thumbnail from anime order by random() limit 24;`

    return result
}
