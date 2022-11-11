/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: "@svgr/webpack",
		})
		return config
	},
	images: {
		domains: ["avatars.githubusercontent.com", "cdn.myanimelist.net", "i.pravatar.cc"],
	},
	experimental: {
		appDir: true,
	},
	reactStrictMode: false,
}

module.exports = nextConfig
