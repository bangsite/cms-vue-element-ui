import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.purple,
      warning: colors.orange,
      info: colors.indigo,
      success: colors.green,
      gray: colors.gray,
      red: colors.red,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
