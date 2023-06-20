import prisma from "@/prisma"

export async function getUser({ userId }: { userId: string }) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            createdAt: true,
        },
    })
    const histCount = await prisma.history_entry.groupBy({
        where: { userId: userId },
        by: ["status"],
        _count: { status: true },
    })

    const tmpHist = histCount.reduce((accum, value) => {
        accum[value.status] = value._count.status
        return accum
    }, {} as { [key: string]: number })

    const hist = {
        WATCHING: tmpHist["WATCHING"] || 0,
        COMPLETED: tmpHist["COMPLETED"] || 0,
        HOLD: tmpHist["HOLD"] || 0,
        CONSIDERING: tmpHist["CONSIDERING"] || 0,
        DROPPED: tmpHist["DROPPED"] || 0,
    }

    return { user, hist }
}
