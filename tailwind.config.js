/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-tertiary-80': 'var(--bg-tertiary-80)',
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-10': 'var(--accent-primary-10)',
        'accent-primary-30': 'var(--accent-primary-30)',
        'accent-primary-80': 'var(--accent-primary-80)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-secondary-10': 'var(--accent-secondary-10)',
        'accent-secondary-30': 'var(--accent-secondary-30)',
        'accent-secondary-80': 'var(--accent-secondary-80)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-primary-5': 'var(--text-primary-5)',
        'text-primary-30': 'var(--text-primary-30)',
        'text-primary-70': 'var(--text-primary-70)',
        'text-secondary': 'var(--text-secondary)',
      },
    },
  },
  plugins: [],
}
