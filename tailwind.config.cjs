/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    colors: {
      theme: '#F15025',
      orange: '#F0BB00',
      white: '#FFFFFF',
      blue: '#007CBE',
      green: '#00CC66',
      'light-grey': '#6C8093',
      'social-link-bg': '#007CBE',
      'color-dark': '#011627',
    },
    extend: {},
  },
  plugins: [],
};
