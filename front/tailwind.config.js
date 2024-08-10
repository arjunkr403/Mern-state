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
        'glight':'#505050',
        'gdark':'#404040'
        // Add more custom colors here if needed
      },
    },
  },
  plugins: [
    
  ],
};
