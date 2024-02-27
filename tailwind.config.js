/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        verde_oscuro: '#0B5B37', //color de relleno de los botones
        verde_claro: '#229C44', // color para encabezado
        azul_titulo: '#111827',
        gris_texto:'#404652',
      }
    },
  },
  plugins: [],
}

