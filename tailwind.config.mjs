/** @type {import('tailwindcss').Config} */
// Hahn Physiotherapie — Palette aus Logo-Pixel-Analyse:
// Blau #2888C0 (Marke), Grau #909898. Warmes Off-White-Fundament (Paper #FAF7F2),
// medizinisches Blau als Verstand, ein warmer Clay-Akzent (Sportler-Waerme) sparsam.
// Single Source of Truth der Farbwerte: src/styles/global.css :root (RGB-Triplets).
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--rgb-ink) / <alpha-value>)',
          soft: 'rgb(var(--rgb-ink-soft) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--rgb-muted) / <alpha-value>)',
          light: 'rgb(var(--rgb-muted-light) / <alpha-value>)',
        },
        paper: 'rgb(var(--rgb-paper) / <alpha-value>)',
        cream: 'rgb(var(--rgb-cream) / <alpha-value>)',
        sand: 'rgb(var(--rgb-sand) / <alpha-value>)',
        line: 'rgb(var(--rgb-border) / <alpha-value>)',
        blue: {
          DEFAULT: 'rgb(var(--rgb-blue) / <alpha-value>)',
          deep: 'rgb(var(--rgb-blue-deep) / <alpha-value>)',
          ink: 'rgb(var(--rgb-blue-ink) / <alpha-value>)',
          bright: 'rgb(var(--rgb-blue-bright) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--rgb-dark) / <alpha-value>)',
          deep: 'rgb(var(--rgb-dark-deep) / <alpha-value>)',
          soft: 'rgb(var(--rgb-dark-soft) / <alpha-value>)',
        },
        clay: 'rgb(var(--rgb-clay) / <alpha-value>)',
        green: 'rgb(var(--rgb-green) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: { pill: '999px' },
      maxWidth: { '7xl': '80rem', '8xl': '88rem' },
    },
  },
  plugins: [],
};
