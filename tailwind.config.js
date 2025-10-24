/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'fkb-bg': 'var(--fkb-bg)',
        'fkb-bg-diagonal': 'var(--fkb-bg-diagonal)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
