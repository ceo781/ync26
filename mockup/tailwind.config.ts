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
        primary: { DEFAULT: "#1A1A1A", dark: "#000000" },
        secondary: { DEFAULT: "#C9A050", light: "#D4B060" },
        accent: { DEFAULT: "#2563EB" },
      },
    },
  },
  plugins: [],
};

export default config;
