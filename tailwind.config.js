/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F363F',
          dark: '#1A1D21',
        },
        secondary: {
          DEFAULT: '#6B7280',
        },
        accent: {
          DEFAULT: '#00AD6A',
          light: '#E6F6EF',
        },
        surface: {
          DEFAULT: '#F7F9FC',
        }
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};