/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#f48fb1',
        'cosmic-amber': '#f59e0b',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #f48fb1 0%, #f59e0b 100%)',
      },
    },
  },
  plugins: [],
}
