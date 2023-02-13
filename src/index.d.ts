declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
	export default content
}

export interface CardAnime {
	id: number
	title: string
	score: number
	studio: string | null
	thumbnail: string | null
	age_rating: string | null
}
