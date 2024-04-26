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
        "green": "#FF6969",
        "red": "#FF6868",
        "secondary": "#555",
        "prigmayBG": "#FCFCFC",
        "grey": "#191b24",
        "transparent": 'transparent',
        
      }
    },
  },
  plugins: [require("daisyui")],
}
