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
    extend: {
      boxShadow: {
        'currency-list':
          'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
      },
    },
  },
  plugins: [],
};
