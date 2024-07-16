module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: false,
  theme: {
    extend: {
      colors:{
        "col-primary":"#9AEBA3",
        "col-secondary":"#45C4B0" 
      },
      fontFamily: {
        Roboto: ["Roboto, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      }
    },
  },
  plugins: [require('daisyui')],
};
