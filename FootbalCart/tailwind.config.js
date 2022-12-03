/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./assets*.liquid",
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/*.liquid",
    "./templates/customers/*.liquid",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Kufam: ['Kufam', 'sans-serif'],
    },
  },
  plugins: [],
}
