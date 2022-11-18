import VideoPlayer from "@/components/VideoPlayer"
import prisma from "@/prisma"
import Comments from "@/components/Comments"

const EpPage = async ({ params }) => {
	const res = await prisma.anime.findUnique({
		where: { id: Number(params["anime-id"]) },
		select: {
			episodes: {
				where: { id: Number(params["episode-id"]) },
				select: { file_url: true },
			},
		},
	})

	const { file_url } = res.episodes[0]
	return (
		<div>
			<VideoPlayer url={file_url} />
			<Comments />
		</div>
	)
}
export default EpPage
