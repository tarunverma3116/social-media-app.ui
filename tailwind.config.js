/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Poppins", "sans-serif"],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        background: {
          primary: "#0c111a",
          secondary: "#ffffff",
          highlight: "#F4F4F5",
          error: "#EA3A3D",
          success: "#C3E6CD",
        },
        foreground: {
          primary: "#ffffff",
          secondary: "#1E2028",
          accent: "#0157FF",
          highlight: "#F4F4F5",
          neutral: "#A8AAB6",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
  daisyui: {
    themes: ["light"],
  },
};
