/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nykaa: {
          pink: "var(--nykaa-pink)",
          "pink-hover": "var(--nykaa-pink-hover)",
          canvas: "var(--nykaa-canvas)",
          surface: "var(--nykaa-surface)",
          ink: "var(--nykaa-ink)",
          muted: "var(--nykaa-muted)",
          hairline: "var(--nykaa-hairline)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "10px",
      },
    },
  },
  plugins: [],
};
