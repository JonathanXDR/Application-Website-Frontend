import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      '2xs': '320px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}
