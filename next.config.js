/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{ loader: "@svgr/webpack", options: { runtimeConfig: false } },
			],
		})
		config.resolve.extensions = [".mjs", ".js", ".jsx", ".json"]
		return config
	},
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"cdn.myanimelist.net",
			"i.pravatar.cc",
			"lh3.googleusercontent.com",
		],
	},
	experimental: {
		appDir: true,
	},
	reactStrictMode: false,
}

module.exports = nextConfig
