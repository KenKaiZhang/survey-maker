/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    color: {},
    extend: {
      aspectRatio: {
        "2/3": "2 / 3",
      },
    },
    fontSize: {
      1: "1rem",
      1.5: "1.5rem",
      2: "2rem",
      3: "3rem",
      4: "4rem",
    },
  },
  plugins: [require("tailwindcss")("./tailwind.js"), require("autoprefixer")],
};
