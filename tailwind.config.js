/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#22d3ee',
          purple: '#a855f7',
          pink: '#ec4899'
        },
        base: {
          black: '#06070a',
          dark: '#0d1018',
          card: '#141826'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 20px rgba(34, 211, 238, 0.35)',
        purpleGlow: '0 0 25px rgba(168, 85, 247, 0.35)'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-120%)', opacity: '0' },
          '15%': { transform: 'translateY(0)', opacity: '1' },
          '85%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-120%)', opacity: '0' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        slideIn: 'slideIn 5s ease-in-out',
        fadeUp: 'fadeUp 0.5s ease-out'
      }
    }
  },
  plugins: []
}