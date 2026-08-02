/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["TikTok Sans", "system-ui", "sans-serif"],
      },
      colors: {
        linkedin: {
          blue: "#0A66C2",
          black: "#000000",
          gray: "#F3F2EF",
        },
      },
    },
  },
  plugins: [],
};
