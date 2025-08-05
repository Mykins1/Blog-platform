/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Use 'class' strategy for toggling dark mode
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
