/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        header: ['Days One' , 'serif'],
        body: ['Roboto' , 'sans-serif'],
        bold:['Roboto-bold' , 'sans-serif']

      },
     colors:{
      primary: '#36567C',
      secondary: '#1d4ed8',
      text: '#333',
      background: '#ffffff',
     }
    },
  },
  plugins: [],
}

