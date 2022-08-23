/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      scale:{
        '3x': '3',
      },
      colors: {
        dark:{
          '100': '#d5d7e0',
          '200': '#acaebf',
          '300': '#8c8fa3',
          '400': '#666980',
          '500': '#4d4f66',
          '600': '#34354a',
          '700': '#282f36',
          '800': '#212529',
          '900': '#0c0d21',
          '1000': '#01010a',
        },
        light:{
          '100': '#eeeeee',
          '200': '#dddddd'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
