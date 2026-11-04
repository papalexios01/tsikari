/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sand: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebdfcb',
          300: '#dccaa9',
          400: '#c7ad82',
          500: '#b39363',
        },
        clay: {
          100: '#f6e3d8',
          300: '#e0a283',
          400: '#cc845f',
          500: '#b8643f',
          600: '#9c5133',
          700: '#7c3f29',
        },
        olive: {
          100: '#e9ebdc',
          300: '#b5ba8f',
          500: '#6f7550',
          700: '#454a31',
        },
        aegean: {
          100: '#dde9ef',
          300: '#8fb3c4',
          500: '#3d7591',
          600: '#2f6079',
          700: '#244a5e',
        },
        ink: {
          400: '#8a847b',
          500: '#6b665e',
          700: '#3b3832',
          800: '#26241f',
          900: '#171613',
        },
        success: { 100: '#e1efe3', 500: '#3f7d4e', 600: '#346a41', 700: '#2a5735' },
        warning: { 100: '#fbefd5', 500: '#c38a1e' },
        error: { 100: '#f8e0dc', 500: '#b5402f', 700: '#8a2e21' },
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        scroll: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s cubic-bezier(.2,.7,.2,1) both',
        'slow-zoom': 'slow-zoom 9s cubic-bezier(.2,.7,.2,1) both',
        scroll: 'scroll 2.2s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
