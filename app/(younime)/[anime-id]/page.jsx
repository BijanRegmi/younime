import prisma from "@/prisma"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/api/auth/[...nextauth]"
import { notFound, redirect } from "next/navigation"

const Page = async ({ params }) => {
	const animeId = Number(params["anime-id"])

	const session = await unstable_getServerSession(authOptions)

	var result

	// If the user is logged in and has a history record
	// for that anime, redirect to the last watched ep
	if (session && session?.user) {
		result = await prisma.history_entry.findUnique({
			where: { userId_animeId: { userId: session.user.id, animeId } },
			select: { epId: true },
		})
		if (result?.epId) {
			result.id = result.epId
			delete result.epId
		}
	}

	// If no history record was found, redirect to the 1st ep of the anime
	if (!result?.id) {
		result = await prisma.episode.findFirst({
			where: { animeId },
			orderBy: { id: "asc" },
			select: { id: true },
		})
	}

	if (result?.id != undefined) redirect(`/${animeId}/${result.id}`)
	else notFound()
}

export default Page
