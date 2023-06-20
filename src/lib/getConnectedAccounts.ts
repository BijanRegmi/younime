import prisma from "@/prisma"

export const getConnectedAccount = async ({ userId }: { userId?: string }) => {
    if (!userId) return { google: false, github: false }

    const accounts = await prisma.account
        .findMany({
            where: { userId },
            select: { provider: true },
        })
        .then(res => res.map(a => a.provider))

    return {
        google: accounts.includes("google"),
        github: accounts.includes("github"),
    }
}
