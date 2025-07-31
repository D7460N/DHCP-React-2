/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#B1DDF0',
        'secondary': '#F0E9D2',
        'accent': '#F0D1D7',
        'background': '#F5F5F5',
        'text': '#333333',
      }
    },
  },
  plugins: [],
}
