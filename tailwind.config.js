/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0366D6',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#0366D6',
          600: '#0252AB',
          700: '#023D80',
          800: '#012956',
          900: '#01142B',
        },
        secondary: {
          DEFAULT: '#FFD900',
          50: '#FFFEF0',
          100: '#FFFCE0',
          200: '#FFF9C2',
          300: '#FFF5A3',
          400: '#FFF285',
          500: '#FFD900',
          600: '#CCAD00',
          700: '#998200',
          800: '#665600',
          900: '#332B00',
        },
      },
    },
  },
  plugins: [],
}
