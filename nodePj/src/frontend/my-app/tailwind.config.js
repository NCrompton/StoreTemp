/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['10px', {lineHeight:'15px', letterSpacing:'0.02rem'}],
        rd: ['10px', {lineHeight:'15px', letterSpacing:'0.2rem'}],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
