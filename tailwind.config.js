/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue:'#274C77',
        lightBlue: '#6096BA',
        lightGray: '#C5C6C4',
        darkGray: '#8B8C89'
      },
      screens: {
        xs: "0px", //0 a 639
        sm: "640px", // 640 a 767
        md: "768px", //768 a 1023
        lg: "1024px", //1024 a 1279
        xl: "1280px", //1280 a 1882
        xxl: "1883px", 
      },
    },
  },
  plugins: [],
}

