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
          forest: '#10251C',
          black: '#11110F',
          dark: '#09130F',
          abyss: '#09130F',
          sage: '#8BAF91',
          green: '#10251C',
          'green-accent': '#8BAF91',
          stone: '#D8D2C5',
          'stone-light': '#EAE5D9',
          border: '#DDD7C8',
          'border-dark': '#232521',
          muted: '#686762',
          'muted-dark': '#A3A199',
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
