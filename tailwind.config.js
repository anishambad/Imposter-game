/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        grape: { 950: '#170a33', 900: '#220f4d', 800: '#34177a', 700: '#4b21a8' },
        violet: { game: '#7c3aed' },
        candy: '#ff4fa3',
        sun: '#ffd23f',
        sky: { game: '#38bdf8' },
        cream: '#fff8ec',
      },
      fontFamily: {
        display: ['Fredoka', 'Baloo 2', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(-6deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        bounceLetter: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wobble: {
          '0%,100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        bounceLetter: 'bounceLetter 1.8s ease-in-out infinite',
        wobble: 'wobble 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
