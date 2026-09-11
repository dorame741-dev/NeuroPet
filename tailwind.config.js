/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
        },
        amber: {
          DEFAULT: '#F59E0B',
        },
        slatebg: '#F8FAFC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(15,23,42,0.04), 0 4px 16px -4px rgba(15,23,42,0.08)',
      },
      keyframes: {
        confettiFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(400px) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        confetti: 'confettiFall 1.8s ease-in forwards',
      },
    },
  },
  plugins: [],
}
