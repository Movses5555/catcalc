/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

 
module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx}",
    "./pages/**/*.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});