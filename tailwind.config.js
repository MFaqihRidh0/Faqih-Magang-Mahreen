/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#171412', // footer, siluet wayang
          900: '#1F1B19', // section alternatif
          800: '#2A2623', // BACKGROUND UTAMA
          700: '#36302C', // kartu
          600: '#4A423C', // border
        },
        gold: {
          300: '#E3CFA6', // highlight, cahaya blencong
          400: '#D6BC8A',
          500: '#C9A96E', // CHAMPAGNE GOLD UTAMA
          600: '#A8864F', // hover, motif batik di atas gold
          700: '#7E6337',
        },
        cream: {
          50:  '#FBF7EF',
          100: '#F5EEDF', // CREAM UTAMA — teks di atas charcoal
          200: '#EAE0CC',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        caveat: ['"Caveat"', 'cursive'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'blencong-pulse': 'blencong 4s ease-in-out infinite alternate',
        'wayang-sway': 'sway 3s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blencong: {
          '0%': { opacity: '0.7', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1.02)' },
        },
        sway: {
          '0%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}
