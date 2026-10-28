/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f6ee',
          100: '#e1ebd8',
          200: '#c5d8b5',
          300: '#a1c08a',
          400: '#7fa563',
          500: '#5f8843',
          600: '#486c32',
          700: '#385529',
          800: '#1F3A12', // Primary Logo Forest Green
          900: '#15270c',
          950: '#0a1405',
        },
        parchment: {
          50: '#fdfbf7',
          100: '#FAF6EE',
          200: '#EDE8DA', // Brand Cream / Parchment
          300: '#E1D9C3',
          400: '#CEBE9A',
        },
        olive: {
          400: '#B8CB65',
          500: '#9DB04F', // Olive-lime accent
          600: '#83963c',
        },
        accent: {
          400: '#5f8843',
          500: '#3b6930', // Single brand accent (replaces the old chilli red)
          600: '#2d5226',
        },
        wood: {
          500: '#8C654D',
          600: '#6E4933',
          700: '#5C3D2E', // Warm wood brown
          800: '#43291B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

