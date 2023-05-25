import prisma from "@/prisma"
import { CardAnime } from "@/index"

export async function getRandomAnime() {
    const result: CardAnime[] =
        await prisma.$queryRaw`select id, title, score, type, thumbnail from anime order by random() limit 24;`

    return result
}
