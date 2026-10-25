/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#f8fafc',
        surface: '#ffffff',
        ink: '#0f172a',
        secondary: '#64748b',
        muted: '#94a3b8',
        line: '#e2e8f0',
        soft: '#f1f5f9',
        green: '#047857',
        'green-dark': '#064e3b',
        'green-light': '#ecfdf5',
        red: '#be123c',
        'red-light': '#fff1f2',
        amber: '#b45309',
        'amber-light': '#fffbeb',
      },
    },
  },
  plugins: [],
};
