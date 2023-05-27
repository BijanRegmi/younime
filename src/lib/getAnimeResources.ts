interface Quality {
    url: string
    name: string
}

interface VideoSource {
    name: string
    type: string
    qualities: Quality[]
}

type Track = {
    src: string
    label: string
    kind: string
    srcLang: string
    default?: boolean
}

interface AnimeResource {
    source: VideoSource[]
    backupSource: VideoSource[]
    tracks: Track[]
    intro: { start: number; end: number }
    outro: { start: number; end: number }
}

export interface AnimeResources {
    sub?: AnimeResource
    dub?: AnimeResource
}

export const getAnimeResources = async (id: number) => {
    const url = new URL(process.env.YOUNIME_VIDEO_SERVER as string)
    url.searchParams.set("id", id.toString())

    const resp: AnimeResources | undefined = await fetch(url)
        .then(r => r.json())
        .catch(console.error)

    return resp
}
