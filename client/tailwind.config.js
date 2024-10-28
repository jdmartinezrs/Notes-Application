/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Activa el modo oscuro usando clases
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
    ],
    theme: {
      extend: {
        colors: {
          background1: '#252525',
          background2: '#9A9A9A',
          button1: '#3B3B3B',
          button2: '#FF0000',
          input1: '#3B3B3B',
          card1: '#FD99FF',
          card2: '#FF9E9E',
          card3: '#91F48F',
          card4: '#FFF599',
          card5: '#9EFFFF',
          card6: '#B69CFF',
          color1: '#FFFFFF',
          color2: '#CFCFCF',
          color3: '#9A9A9A',
          color4: '#000000',
        },
      },
    },
    plugins: [
      require('flowbite/plugin'),
    ],
  }
  