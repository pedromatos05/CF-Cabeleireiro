import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF4',
          100: '#F7EDD8',
          200: '#EDD8B5',
          300: '#DEC09C',
        },
        brown: {
          50:  '#FAF5EE',
          100: '#F0E0C8',
          200: '#DCC09A',
          300: '#C4996C',
          400: '#A87347',
          500: '#7D5234',
          600: '#5E3A22',
          700: '#3F2514',
          800: '#261508',
          900: '#140A03',
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
