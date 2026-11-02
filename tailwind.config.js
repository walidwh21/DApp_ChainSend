/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#070b14", 900: "#0b1220", 800: "#111a2e", 700: "#1a2540" },
        mint: { 400: "#34e0b4", 500: "#14c99a", 600: "#0ea77f" },
        iris: { 400: "#8b7cff", 500: "#6c5ce7" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], mono: ["JetBrains Mono", "monospace"] },
      keyframes: {
        rise: { "0%": { opacity: 0, transform: "translateY(12px)" }, "100%": { opacity: 1, transform: "none" } },
      },
      animation: { rise: "rise .5s ease-out both" },
    },
  },
  plugins: [],
};
