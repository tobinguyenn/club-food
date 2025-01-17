/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fef2f4',
          400: '#e64d6e',
          DEFAULT: '#ee6781',
        },
      },
    },
  },
  plugins: [],
};
