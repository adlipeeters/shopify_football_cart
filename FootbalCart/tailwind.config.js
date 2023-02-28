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
    extend: {
      height: {
        94: "22rem",
      },
      padding: {
        "480px": "480px",
        120: "480px",
      },
      screens: {
        xxs: "425px", // min-width
      },
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Kufam: ["Kufam", "sans-serif"],
    },
  },
  plugins: [],
};
