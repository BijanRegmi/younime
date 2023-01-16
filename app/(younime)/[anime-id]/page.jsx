import prisma from "@/prisma"
import { notFound, redirect } from "next/navigation"

const Page = async ({ params }) => {
	const animeId = Number(params["anime-id"])

	const epid = await prisma.episode.findFirst({
		where: { animeId },
		orderBy: { id: "asc" },
		select: { id: true },
	})

	if (epid?.id != undefined) redirect(`/${animeId}/${epid.id}`)
	else notFound()
}

export default Page
