/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#102C20',
          deep: '#102C20',
          dark: '#0A1C14',
          light: '#183C2D',
        },
        soil: {
          DEFAULT: '#211B14',
          dark: '#14100C',
          light: '#31291E',
          rich: '#2B2219',
        },
        cream: {
          DEFAULT: '#F3F0E5',
          soft: '#FAF8F3',
          dark: '#DED9C9',
        },
        leaf: {
          DEFAULT: '#819B63',
          muted: '#819B63',
          dark: '#617747',
        },
        fresh: {
          DEFAULT: '#A9C77B',
          bright: '#BCE08A',
        },
        sunlight: {
          DEFAULT: '#E7C77C',
          golden: '#F4D48B',
          glow: '#FFE29A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
