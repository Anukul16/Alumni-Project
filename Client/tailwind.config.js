/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customColor: '#36567c',
        primary: '#36567C',
        secondary: '#1d4ed8',
        text: '#333',
        background: '#ffffff', 
      },
      fontFamily:{
        header: ['Days One' , 'serif'],
        body: ['Roboto' , 'sans-serif'],
        bold:['Roboto-bold' , 'sans-serif']

      },
    },
    screens: {
      'xxs':'320px',
      'xs': '450px', 
      'sm': '640px',
      'md':'768px',
      'lg':'1024px',
      'lg2':'1025px',
      'lg2end':'1150',
      'xl':'1280px',
      '2xl':'1536px',
      '3xl':'1730px'
    },
  },
  plugins: [],
}

