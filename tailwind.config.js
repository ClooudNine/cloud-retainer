/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'genshin': ['var(--font-genshin)']
      },
      cursor: {
        'genshin': 'url("/wish-simulator/genshin-cursor.cur"), default'
      }
    },
  },
  plugins: [],
}
