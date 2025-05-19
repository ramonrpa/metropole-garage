/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbfde8',
          100: '#f6fbcc',
          200: '#eaf79f',
          300: '#d9ee68',
          400: '#c5e13a',
          500: '#bce01e',
          600: '#829f11',
          700: '#637912',
          800: '#4f6014',
          900: '#425116',
          950: '#222d06',
        },
      },
    },
  },
  plugins: [],
}
