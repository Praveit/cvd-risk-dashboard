/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#f5f0e8',
          warm: '#f0ead8',
        },
        champagne: {
          DEFAULT: '#e8e0d0',
          light: '#ede6d8',
        },
        sand: '#d8cfc0',
        charcoal: {
          DEFAULT: '#1a1a1a',
          soft: '#2a2a28',
        },
        stone: {
          DEFAULT: '#6b6560',
          light: '#8a857e',
        },
        gold: {
          DEFAULT: '#b8965a',
          light: '#d4b87a',
          muted: '#a08548',
        },
        risk: {
          low: '#4a6741',
          'low-bg': '#f0f2ec',
          moderate: '#8b7234',
          'moderate-bg': '#f5f0e4',
          high: '#7a3b3b',
          'high-bg': '#f4ece8',
        },
        protective: {
          DEFAULT: '#3d5a6e',
          bg: '#edf0f2',
        },
      },
      fontFamily: {
        sans: ['Jost', 'Futura', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        'luxury': '12px',
        'luxury-lg': '16px',
        'luxury-xl': '24px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}