import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#fbf8ff',
          100: '#f3ecff',
          200: '#e4d6ff',
          300: '#cdb8ff',
          400: '#a989f4',
          500: '#875be4',
          600: '#7140cb',
          700: '#5c32a5',
          800: '#4c2c84',
          900: '#3f2869'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(73, 45, 122, 0.12)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
