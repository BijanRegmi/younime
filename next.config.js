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
        config.externals.push("canvas")
        return config
    },
    images: {
        remotePatterns: [{ protocol: "https", hostname: "**" }],
    },
    experimental: {
        appDir: true,
    },
    reactStrictMode: false,
}

module.exports = nextConfig
