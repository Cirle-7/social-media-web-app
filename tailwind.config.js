/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        20: '20vw',
        60: '60vw',
      },
      colors: {
        accent: '#f0f1f3',
        primary: '#fcfcfc',
      },
    },
  },
  plugins: [],
};
