import { authOptions } from "@/api/auth/[...nextauth]"
import prisma from "@/prisma"
import layout from "@/styles/index.module.css"
import { getServerSession } from "next-auth"
import Comments from "../Comments"
import VideoPlayer from "../VideoPlayer"
import { AnimeStatus } from "@prisma/client"
import crypto from "crypto"
import { notFound } from "next/navigation"

const WatchPage = async ({
	params,
}: {
	params: { "ep-id": string; "anime-id": string }
}) => {
	const id = Number(params["ep-id"])
	const animeId = Number(params["anime-id"])

	const result = await prisma.episode.findUnique({
		where: { id },
		select: { file_url: true },
	})

	if (!result) return notFound()

	// Encrypting thevar tobeEncrypted = 'some secret string';
	const secret = Buffer.from(process.env.YOUNIME_SECRET as string, "base64")
	const cipher = crypto.createCipheriv("aes-256-ecb", secret, null)
	const encrypted = Buffer.concat([
		cipher.update(result.file_url as string),
		cipher.final(),
	])
	result.file_url = "/api/video?key=" + encrypted.toString("hex")

	// If the status of anime is WATCHING for that user
	// then update the last watching episode id
	const session = await getServerSession(authOptions)
	if (session && session.user?.id) {
		await prisma.history_entry.updateMany({
			where: {
				animeId,
				userId: session.user.id,
				status: AnimeStatus.WATCHING,
			},
			data: { epId: id },
		})
	}

	return (
		<>
			<VideoPlayer url={result?.file_url} />
			<div className={layout.comments}>
				<Comments />
			</div>
		</>
	)
}

export default WatchPage
