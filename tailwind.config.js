/** @type {import('tailwindcss').Config} */
export default {
<<<<<<< HEAD
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#22c55e", // GREEN
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
      },
      fontFamily: {
        display: ["Spline Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
=======
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This allows you to toggle dark mode by adding 'dark' to the <html> tag
  theme: {
    extend: {
      colors: {
        "primary": "#13ec5b",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
>>>>>>> 47371c7ab732ffae7fd31577fedc36365a3a36e9
