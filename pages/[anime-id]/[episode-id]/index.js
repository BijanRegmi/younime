import VideoPlayer from "../../../components/VideoPlayer/"
import prisma from "../../../prisma"

const ep = ({ episode }) => {
	return <VideoPlayer episode={episode} />
}

export const getServerSideProps = async context => {
	const id = context.params["episode-id"]
	const episode = await prisma.episode.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			name: true,
			file_url: true,
		},
	})
	episode.id = id
	return { props: { episode } }
}

export default ep
