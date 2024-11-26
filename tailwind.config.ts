import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      blue: colors.blue,
      purple: colors.purple,
      orange: colors.orange,
      indigo: colors.indigo,
      green: colors.green,
      gray: colors.gray,
      red: colors.red,
      para: "#232323",
      transparent: "transparent",
    },
    fontFamily: {
      en: ["Poppins", "sans-serif"],
      ja: ["Noto Sans JP", "sans-serif"],
      vi: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
