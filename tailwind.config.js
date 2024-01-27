/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    './*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'white': '#FFF',
      'red': colors.red,
      'purple': {
        50: '#D4CBDE',
        300: '#B4A2C8',
        550: '#9479B1',
        700: '#744F9C',
        950: '#542686'
      },
      'gray':  {
        50: '#F3F3F3',
        100: '#E9E7E7',
        300: '#B6B6B6',
        550: '#7A7A7A',
        700: '#3D3D3D',
        950: '#000000',
      },
    },
    fontFamily: {
      PlusJakartaSans: ["Plus Jakarta Sans", "sans-serif"],
    },
    letterSpacing: {
      wide: '0.00625rem'
    },
    extend: {},
  },
  plugins: [],
}

