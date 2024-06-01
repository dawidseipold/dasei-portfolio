/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#9A64F5",
          "primary-content": "#fff",
          secondary: "#f563bb",
          "secondary-content": "#fff",
          accent: "#63daf5",
          "accent-content": "#fff",
          neutral: "#242424",
          "neutral-content": "#fff",
          "base-100": "#101010",
          "base-200": "#181818",
          "base-300": "#212121",
          "base-content": "#fff",
          info: "#4DA7ED",
          "info-content": "#fff",
          success: "#69CC7A",
          "success-content": "#fff",
          warning: "#F69851",
          "warning-content": "#fff",
          error: "#f56363",
          "error-content": "#fff",
        },
      },
    ],
  },
};
