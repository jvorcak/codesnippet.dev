module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        koulen: ['Koulen', 'sans-serif'],
      },
      colors: {
        editors: {
          github: {
            dark: '#0d1117',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    fontFamily: true,
  },
}
