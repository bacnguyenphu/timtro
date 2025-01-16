/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#E41B23',
        'blue-primary': '#3763E0',
      },
    },
  },
  plugins: [],
}

