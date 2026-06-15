/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#FAF7F2',
        linen:    '#F0E8DC',
        gold:     '#C9A96E',
        'gold-light': '#E8D5B0',
        'gold-dark':  '#A07C45',
        espresso: '#3D2B1F',
        'espresso-mid': '#5C4033',
        ember:    '#E85D26',
      },
      fontFamily: {
        display: ['Clash Display', 'Space Grotesk', 'sans-serif'],
        body:    ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A96E, #E8D5B0, #C9A96E)',
        'espresso-gradient': 'linear-gradient(135deg, #3D2B1F, #5C4033)',
      },
    },
  },
  plugins: [],
}
