/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
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
        body: ['Amaranth-Regular' , 'sans-serif'],
        bold:['Roboto-bold' , 'sans-serif']

      },
    },
    screens: {
      // 'xxs':'320px',
      'xxs':'350px',
      'xs': '450px', 
      'sm': '640px',
      'md':'768px',
      'lg':'1024px',
      'lg2':'1025px',
      'lg2end':'1150',
      'xl':'1280px',
      '2xl':'1536px',
      '3xl':'1730px'
      // 'xl':'1280px',
      // '2xl':'1536px'

    },
  },
  plugins: [nextui()],
}

