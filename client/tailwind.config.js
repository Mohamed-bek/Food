/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "867px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        expand: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        expandSlow: "expand 1s 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        expandMedium:
          "expand 1.25s 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        expandFast: "expand 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
