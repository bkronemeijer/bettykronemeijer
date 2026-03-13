import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-badge": "spinBadge 18s linear infinite",
      },
      colors: {
        pink: "#ffa3ca",
        red: "#d31412",
        "green-dark": "#285d3f",
        "green-light": "#7bbcb0",
        cream: "#f5f0e8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mersad: ["Mersad", "sans-serif"],
      },
      keyframes: {
        spinBadge: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
