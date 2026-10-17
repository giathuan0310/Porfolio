import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./it_developer_interactive_portfolio.tsx"
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f2fe',
          emerald: '#10b981',
          purple: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [
    tailwindcssAnimate
  ],
}
