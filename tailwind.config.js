/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#faf7f2',
        'ivory-warm': '#f5efe6',
        champagne: '#e8e0d0',
        'champagne-light': '#ede6d8',
        sand: '#d4cab8',
        charcoal: '#141414',
        'charcoal-soft': '#242422',
        stone: '#6b6560',
        'stone-light': '#8a857e',
        gold: '#b8965a',
        'gold-light': '#d4b87a',
        'gold-muted': '#a08548',
        'risk-low': '#3d5c35',
        'risk-low-bg': '#eef1ec',
        'risk-moderate': '#7d662e',
        'risk-moderate-bg': '#f3eee2',
        'risk-high': '#6d3434',
        'risk-high-bg': '#f0e6e4',
        'risk-veryhigh': '#4a1d1d',
        'risk-veryhigh-bg': '#eae3e1',
        protective: '#324a5a',
        'protective-bg': '#e8edf0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Futura', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'luxury': '12px',
        'luxury-lg': '16px',
        'luxury-xl': '24px',
        'luxury-2xl': '32px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(20, 20, 20, 0.06)',
        'glass-hover': '0 12px 40px rgba(20, 20, 20, 0.08)',
      },
      backdropBlur: {
        'glass': '24px',
        'glass-sm': '16px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}