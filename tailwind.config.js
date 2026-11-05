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
          50: '#f9f6f0',
          100: '#f2ece1',
          200: '#e6dccb',
          300: '#d6c6a9',
          400: '#c2a97f',
          500: '#a88d60',
          600: '#8a7149',
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
          300: '#a9a399',
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
        'line-up': {
          '0%': { transform: 'translateY(105%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
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
        'line-up': 'line-up 1.2s cubic-bezier(.2,.7,.2,1) both',
        'slow-zoom': 'slow-zoom 9s cubic-bezier(.2,.7,.2,1) both',
        'spin-slow': 'spin-slow 24s linear infinite',
        scroll: 'scroll 2.2s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
