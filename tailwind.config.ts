import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "gx-cyan": "#00D1FF",
                "gx-emerald": "#00FF85",
                "gx-slate": "#0F172A",
            },
            backdropBlur: {
                xs: "2px",
                lg: "12px",
            },
            animation: {
                float: "floating 3s ease-in-out infinite",
            },
            keyframes: {
                floating: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
