/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  
  theme: {
    extend: {
      colors: {
        "red": "#991b1b",
        "secondary": "#292524",
        "prigmayBG": "#292524",
        "grey": "#1f2937",
        "transparent": 'transparent',
        "white": "#e5e7eb"
      }
    },
  },
  plugins: [require("daisyui")],
}
