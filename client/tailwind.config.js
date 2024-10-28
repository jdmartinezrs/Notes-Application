/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          'medio': '35px',  // Tamaño de fuente personalizado
          'xxs': '0.625rem',  // Tamaño de fuente adicional
        },
        fontFamily: {
          nunito: ['Nunito', 'sans-serif'],
        },
        colors: {
          background: 'var(--background-1)',  // Color de fondo global
          button: {
            1: 'var(--button-1)',
            2: 'var(--button-2)',
          },
          input: {
            1: 'var(--input-1)',
          },
          card: {
            1: 'var(--card-1)',
            2: 'var(--card-2)',
            3: 'var(--card-3)',
            4: 'var(--card-4)',
            5: 'var(--card-5)',
            6: 'var(--card-6)',
          },
          color: {
            1: 'var(--color-1)',
            2: 'var(--color-2)',
            3: 'var(--color-3)',
            4: 'var(--color-4)',
          },
          graySearch: "#3D3D3D",
          grayUbi: "#D9D9D9",
        },
        margin: {
          'standar': '35px', // Define el margen personalizado de 35px
        },
      },
    },
    plugins: [],
  }
  