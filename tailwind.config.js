/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          ivory: '#F3F0E6',
          black: '#11110F',
          dark: '#10110F',
          green: '#748A70',
          'green-light': '#8EAA8A',
          'green-dark': '#556652',
          stone: '#D8D2C5',
          'stone-light': '#EBE7DD',
          border: '#E2DDD1',
          'border-dark': '#232521',
          muted: '#6B6A64',
          'muted-dark': '#9E9D95',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Didot', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'super-wide': '0.25em',
        'ultra-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
