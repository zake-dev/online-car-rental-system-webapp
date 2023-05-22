/** @type {import('tailwindcss').Config} */
const colors = require('./src/styles/colors');

export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
