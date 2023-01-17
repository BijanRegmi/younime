import stream from "node:stream"
import crypto from "crypto"

export default async function handler(req, res) {
	const range = req.headers?.range
	if (!range) return res.status(400)

	const key = req.query.key

	const secret = Buffer.from(process.env.YOUNIME_SECRET, "base64")
	const decipher = crypto.createDecipheriv("aes-256-ecb", secret, null)
	const decrypted = Buffer.concat([
		decipher.update(key, "base64"),
		decipher.final(),
	])
	const url = decrypted.toString()

	const req_headers = {
		Range: req.headers.range,
	}

	const resp = await fetch(url, { headers: req_headers })

	const res_headers = {
		"Content-Range": resp.headers.get("content-range"),
		"Accept-Ranges": "bytes",
		"Content-Length": resp.headers.get("content-length"),
		"Content-Type": resp.headers.get("content-type"),
		"Server": "younime v6.9",
	}
	res.writeHead(206, res_headers)

	stream.Readable.fromWeb(resp.body).pipe(res)
}
