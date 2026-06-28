/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1877F2',
          dark: '#166FE5',
          light: '#E7F0FD',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        certified: '#7C3AED',
        loc: '#1877F2',
        live: '#E03131',
        ink: '#050505',
        muted: '#65676B',
        soft: '#F0F2F5',
        line: '#D8DEE9',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        feed: '680px',
        content: '720px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(16,24,40,0.08), 0 1px 2px rgba(16,24,40,0.04)',
        fab: '0 6px 16px rgba(24,119,242,0.35)',
      },
    },
  },
  plugins: [],
}
