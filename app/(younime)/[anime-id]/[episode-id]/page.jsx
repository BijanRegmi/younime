import VideoPlayer from "../../../components/VideoPlayer"
import prisma from "../../../prisma"

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
	return <VideoPlayer url={file_url} />
}
export default EpPage
