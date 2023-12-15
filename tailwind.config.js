/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      spoof: ["Spoof Trial", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      muli: ["Mulish", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      quicksand: ["Quicksand", "sans-serif"],
    },
    colors: {
      primary: "#0d6efd",
      secondary: "#6c757d",
      info: "#0dcaf0",
      warning: "#ffc107",
      danger: "#dc3545",
      white: "#ffffff",
      // light: ,
      // dark: ,
      // outline:
    },
    extend: {},
  },
  plugins: [],
};
