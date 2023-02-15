/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    50: "#000000ff",
                    100: "#0A0A0Aff",
                    150: "#141414ff",
                    200: "#1E1E1Eff",
                    250: "#282828ff",
                    300: "#323232ff",
                    350: "#3C3C3Cff",
                    400: "#464646ff",
                    450: "#505050ff",
                    500: "#5A5A5Aff",
                    550: "#696969ff",
                    600: "#7E7E7Eff",
                    650: "#949494ff",
                    700: "#A9A9A9ff",
                    750: "#BFBFBFff",
                    800: "#D4D4D4ff",
                    850: "#EAEAEAff",
                    900: "#FFFFFFff",
                },
            },
            spacing: {
                sidebarSmall: '3rem',
                sidebarExtend: '9rem',
                sidebarFull: '12rem'
            }
        },
    },
    plugins: [],
}
