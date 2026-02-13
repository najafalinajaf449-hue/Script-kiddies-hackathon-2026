/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 1. Add this to ensure dark mode works when you apply the 'dark' class
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        // 2. Add the 'display' font used in the Admin panel
        display: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        // 3. Keep your existing primary but define 'primary' as a single hex for the Admin panel
        primary: {
          DEFAULT: '#2020df', // This ensures 'bg-primary' works for the new code
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // 4. Add the specific background and accent colors
        "background-light": "#f6f6f8",
        "background-dark": "#111121",
        "emerald-accent": "#10b981",
        "rose-accent": "#f43f5e",
        indigo: {
          900: '#1e1b4b',
          950: '#0f0a1a',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}