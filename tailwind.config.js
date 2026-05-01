/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        starNavy: '#1c1c31',
        starBlue: '#0a87c4'
      }
    }
  },
  plugins: []
};
