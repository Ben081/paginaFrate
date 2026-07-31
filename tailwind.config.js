/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c1a17',
        'ink-deep': '#131210',
        paper: '#f6f2ea',
        'paper-dim': '#ece5d6',
        gold: '#d9a441',
        'gold-bright': '#F0D060',
        teal: '#1f6f6b',
        'teal-bright': '#2c8d88',
      },
      textColor: {
        soft: 'rgba(246,242,234,.7)',
      },
      borderColor: {
        line: 'rgba(217,164,65,.2)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1160px',
      },
    },
  },
  plugins: [],
}
