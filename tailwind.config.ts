import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--bg-color) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                surface: "rgb(var(--surface-color) / <alpha-value>)",
                primary: "rgb(var(--primary) / <alpha-value>)",
                secondary: "rgb(var(--secondary) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
                sans: ['Inter', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config;
