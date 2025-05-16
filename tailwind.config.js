/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        linkedin: {
          blue: '#0A66C2',
          black: '#000000',
          gray: '#F3F2EF',
        },
      },
    },
  },
  plugins: [],
};