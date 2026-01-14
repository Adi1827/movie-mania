/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        default: '5px 5px 5px 5px #00010080',
        hover: '15px 15px 15px 10px #00010080',
        card: '5px 5px 5px 5px rgba(0,0,0,.5);',
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", "sans-serif"],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#948979'
      },
      screens: {
        'xs': '375px',
      },
      keyframes: {
        dropdown: {
          '0%': { opacity: '0', transform: 'scaleY(0.95) translateY(-5px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
