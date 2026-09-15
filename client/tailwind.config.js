/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FBF9F6',
          dark: '#F3EFEA',
        },
        navy: {
          DEFAULT: '#202940',
          light: '#2E3A59',
          dark: '#141A29',
        },
        bronze: {
          DEFAULT: '#8B6240',
          hover: '#735033',
          light: '#F5EBE1',
        },
        emerald: {
          DEFAULT: '#1DA851',
          hover: '#178C43',
          light: '#E7F7ED',
        },
        terracotta: {
          DEFAULT: '#C94C3D',
          hover: '#A83B2E',
          light: '#FBECEB',
        },
        borderSlate: 'rgba(32, 41, 64, 0.12)',
      },
      borderRadius: {
        card: '20px',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(32, 41, 64, 0.05)',
        'card-hover': '0 8px 30px rgba(32, 41, 64, 0.1)',
        floating: '0 10px 25px -5px rgba(32, 41, 64, 0.15), 0 8px 10px -6px rgba(32, 41, 64, 0.1)',
      },
    },
  },
  plugins: [],
};
