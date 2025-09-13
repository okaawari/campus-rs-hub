/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9', // slate-100
          foreground: '#0f172a', // slate-900
        },
        accent: {
          DEFAULT: '#f1f5f9', // slate-100
          foreground: '#0f172a', // slate-900
        },
        destructive: {
          DEFAULT: '#ef4444', // red-500
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f8fafc', // slate-50
          foreground: '#64748b', // slate-500
        },
        border: '#e2e8f0', // slate-200
        input: '#e2e8f0', // slate-200
        ring: '#2563eb', // blue-600
        popover: '#ffffff',
        'popover-foreground': '#0f172a',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}
