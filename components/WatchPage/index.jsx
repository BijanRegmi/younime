import prisma from "@/prisma"
import layout from "@/styles/index.module.css"
import Comments from "../Comments"
import VideoPlayer from "../VideoPlayer"

const WatchPage = async ({ params }) => {
	const id = Number(params["ep-id"])
	const animeId = Number(params["anime-id"])

	const result = await prisma.episode.findFirst({
		where: { id, animeId },
		select: { file_url: true },
	})

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
