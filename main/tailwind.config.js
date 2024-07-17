// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//     },
//   },
//   plugins: [],
// }

// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'back': '#222831',
        'txt1':'#76ABAE',
        'txt2':'#EEEEEE',
        'rnd':'#31363F',
        'glight':'#A0A0A0',
        'gdark':'#696969'
        // Add more custom colors here if needed
      },
    },
  },
  plugins: [],
};
