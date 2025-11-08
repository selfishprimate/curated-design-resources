/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'xl5:grid-cols-5',
    'xxl:grid-cols-6',
    '3xl:grid-cols-8',
    'animate-gradient-orbit-1',
    'animate-gradient-orbit-2',
    'animate-gradient-orbit-3',
    'animate-gradient-orbit-4',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      screens: {
        'xl5': '1500px',
        'xxl': '1640px',
        '3xl': '2000px',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            transform: 'translate(0%, 0%) scale(1.5) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(30%, -20%) scale(2) rotate(5deg)',
          },
          '50%': {
            transform: 'translate(20%, 30%) scale(1.8) rotate(-5deg)',
          },
          '75%': {
            transform: 'translate(-30%, 20%) scale(1.6) rotate(3deg)',
          },
        },
        'gradient-shift-slow': {
          '0%, 100%': {
            transform: 'translate(0%, 0%) scale(1.5) rotate(0deg)',
          },
          '50%': {
            transform: 'translate(-40%, -40%) scale(2.2) rotate(-8deg)',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            transform: 'translateX(-50%) scale(1.8)',
          },
          '50%': {
            transform: 'translateX(50%) scale(2.3)',
          },
        },
        'gradient-x-reverse': {
          '0%, 100%': {
            transform: 'translateX(50%) scale(1.8)',
          },
          '50%': {
            transform: 'translateX(-50%) scale(2.3)',
          },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
        'gradient-shift-slow': 'gradient-shift-slow 14s ease-in-out infinite',
        'gradient-x': 'gradient-x 16s ease-in-out infinite',
        'gradient-x-reverse': 'gradient-x-reverse 18s ease-in-out infinite',
      },
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
