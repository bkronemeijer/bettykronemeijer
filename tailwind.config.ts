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
        "drift-a": "drift-a 18s ease-in-out infinite",
        "drift-b": "drift-b 22s ease-in-out infinite",
        "drift-c": "drift-c 26s ease-in-out infinite",
      },
      colors: {
        pink: "#ffa3ca",
        red: "#d31412",
        "green-dark": "#285d3f",
        "green-light": "#7bbcb0",
        "primary-blue": "#00F",
        orange: "#ffb347",
        "orange-light": "#ffcc99",
        cream: "#f5f0e8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mersad: ["Mersad", "sans-serif"],
        redaction: ["Redaction", "sans-serif"],
        "redaction-10": ["Redaction 10", "sans-serif"],
        "redaction-20": ["Redaction 20", "sans-serif"],
        "redaction-35": ["Redaction 35", "sans-serif"],
        "redaction-50": ["Redaction 50", "sans-serif"],
        "redaction-70": ["Redaction 70", "sans-serif"],
        "redaction-100": ["Redaction 100", "sans-serif"],
      },
      keyframes: {
        spinBadge: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "drift-a": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20vw, 10vh) scale(1.15)" },
          "66%": { transform: "translate(10vw, 25vh) scale(0.9)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "drift-b": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-15vw, -15vh) scale(1.1)" },
          "66%": { transform: "translate(-25vw, 5vh) scale(0.95)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "drift-c": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20vw, 15vh) scale(1.2)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
