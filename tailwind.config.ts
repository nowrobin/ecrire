import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        blink: "blinker 1.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200%" },
          "100%": { backgroundPosition: "-200%" },
        },
        blinker: {
          "0%": { opacity: "100" },
          "50%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
      },
      backgroundSize: {
        custom: "300% 100%",
      },
      backgroundColor: {
        background: "#F6F9F9",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-custom":
          "linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)",
      },
      fontFamily: {
        poppin: [`var(--font-poppins)`],
        hehmlet: [`var(--font-hahmlet)`],
        merriweather: [`var(--font-merriweather)`],
        // suit: ["SUIT Variable"],
      },
    },
  },
  plugins: [],
};
export default config;
