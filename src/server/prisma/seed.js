const { PrismaClient } = require("@prisma/client")
const { readFileSync } = require("fs")

const prisma = new PrismaClient()

const seed = async () => {
    /** @type {{id: number, title: string, alttitle: string, score: number, age_rating: string, studio: string, season: string, type: string, thumbnail: string, synopsis: string, status: string, genres: {name: string}[], episodes: {id: number, name: string, order: number, filler: boolean, animeId: string}[]}[]} */
    const anime = JSON.parse(readFileSync(`${__dirname}/anime.json`))
    for (let i = 0; i < anime.length; i++) {
        const a = anime[i]
        await prisma.anime.create({
            data: {
                id: a.id,
                title: a.title,
                alttitle: a.alttitle,
                score: a.score,
                age_rating: a.age_rating,
                studio: a.studio,
                season: a.season,
                type: a.type,
                thumbnail: a.thumbnail,
                synopsis: a.synopsis,
                status: a.status,
                genres: {
                    connectOrCreate: a.genres.map(g => ({
                        where: { name: g.name },
                        create: { name: g.name },
                    })),
                },
                episodes: {
                    createMany: {
                        data: a.episodes.map(e => ({
                            id: e.id,
                            name: e.name,
                            order: e.order,
                            filler: e.filler,
                        })),
                    },
                },
            },
        })
        console.log("Done: ", i)
    }
}

seed()
