export interface source {
    url: string
    name: string
}

export const getSources = async (id: string) => {
    const url = new URL(process.env.YOUNIME_VIDEO_SERVER as string)
    url.searchParams.set("id", id)

    const resp: source[][] | undefined = await fetch(url)
        .then(r => r.json())
        .catch(console.error)

    return resp || []
}
