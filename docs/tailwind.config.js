/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // use for development
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: ["responsive"],
};
