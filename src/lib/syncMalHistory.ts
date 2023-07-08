import { XMLParser } from "fast-xml-parser"
import prisma from "@/prisma"
import { AnimeStatus } from "@prisma/client"

type MalExport = {
    myanimelist: {
        anime: {
            series_animedb_id: number
            my_status: string
        }[]
    }
}

export const syncMalHistory = async ({
    xml,
    uid,
}: {
    xml: string
    uid: string
}) => {
    const parser = new XMLParser()
    const parsedXML: MalExport = parser.parse(xml)

    const entries_promises = parsedXML["myanimelist"]["anime"].map(
        async anime => {
            const aid = anime["series_animedb_id"]
            const firstEp = await prisma.episode.findFirst({
                where: { animeId: aid, order: 1 },
                select: { id: true },
            })

            const _status = anime["my_status"]
            let status: AnimeStatus
            if (_status == "Completed") status = AnimeStatus.COMPLETED
            else if (_status == "On-Hold") status = AnimeStatus.HOLD
            else if (_status == "Plan to Watch")
                status = AnimeStatus.CONSIDERING
            else if (_status == "Dropped") status = AnimeStatus.DROPPED
            else status = AnimeStatus.WATCHING

            return {
                id: aid,
                status,
                firstEp: firstEp?.id,
            }
        }
    )

    const entries = await Promise.all(entries_promises)
    const filtered_entries = entries.filter(
        (en): en is { id: number; status: AnimeStatus; firstEp: number } =>
            en.firstEp != undefined
    )

    const x = await prisma.$transaction(
        filtered_entries.map(en => {
            return prisma.history_entry.upsert({
                where: { userId_animeId: { userId: uid, animeId: en.id } },
                update: { status: "COMPLETED" },
                create: {
                    userId: uid,
                    animeId: en.id,
                    status: en.status,
                    epId: en.firstEp,
                },
                select: { userId: true },
            })
        })
    )
    return filtered_entries
}
