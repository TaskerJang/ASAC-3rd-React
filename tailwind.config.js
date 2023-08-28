module.exports = {
  mode: 'jit',
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Fix the pattern here
  theme: {
    extend: {
      colors: {
        'regal-blue': '#4169E1',
        'regal-yellow': '#FFFF00', // 노랑색 코드 추가
      },
    },
  },
  variants: {},
  plugins: [('@tailwindcss/typography')],
};
