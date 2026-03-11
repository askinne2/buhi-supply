import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D4A3D",
        accent: "#264252",
        secondary: "#3C422A",
        muted: "#585C62",
        surface: "#F0F2E9",
        background: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Open Sans", "sans-serif"],
        body: ["var(--font-body)", "Average Sans", "sans-serif"],
      },
      borderRadius: {
        button: "6px",
        card: "8px",
      },
      boxShadow: {
        card: "0px 1px 2px rgba(0,0,0,0.05)",
        "wishlist-btn": "0px 2px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
