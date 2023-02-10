import stream from "node:stream"
import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import { OutgoingHttpHeaders } from "node:http"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const range = req.headers?.range
	if (!range) return res.status(400)

	var key: string
	if (typeof req.query.key == "object") key = req.query.key[0] || ""
	else key = req.query.key || ""

	const secret = Buffer.from(process.env.YOUNIME_SECRET as string, "base64")
	const decipher = crypto.createDecipheriv("aes-256-ecb", secret, null)
	const decrypted = Buffer.concat([
		decipher.update(key, "base64"),
		decipher.final(),
	])
	const url = decrypted.toString()

	const req_headers: HeadersInit = new Headers()
	req_headers.set("Range", req.headers.range as string)

	const resp = await fetch(url, { headers: req_headers })
	if (!resp.body) {
		return res.status(400)
	}

	const res_headers: OutgoingHttpHeaders = {
		"Content-Range": resp.headers.get("content-range") as string,
		"Accept-Ranges": "bytes",
		"Content-Length": resp.headers.get("content-length") as string,
		"Content-Type": resp.headers.get("content-type") as string,
		"Server": "younime v6.9",
	}
	res.writeHead(206, res_headers)

	/* @ts-expect-error */
	stream.Readable.fromWeb(resp.body).pipe(res)
}
