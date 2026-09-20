import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kalkuloka brand palette
        navy: {
          50: '#E8EEF5',
          100: '#C5D3E8',
          200: '#9EB6D9',
          300: '#7799C9',
          400: '#5A82BE',
          500: '#3D6BB3',
          600: '#2D5294',
          700: '#1D3A76',
          800: '#122558',
          900: '#0A1729',
          950: '#060E1A',
        },
        teal: {
          50: '#E0FAF7',
          100: '#B3F3EC',
          200: '#80EBE0',
          300: '#4DE2D3',
          400: '#26D9CA',
          500: '#00C2A8',
          600: '#00A890',
          700: '#008E78',
          800: '#006B5A',
          900: '#004840',
        },
        gold: {
          50: '#FFF8E7',
          100: '#FFEFC2',
          200: '#FFE099',
          300: '#FFD166',
          400: '#FFBE33',
          500: '#FFAA00',
          600: '#E69900',
          700: '#CC8800',
          800: '#A36D00',
          900: '#7A5200',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s ease-out',
        'count-up': 'countUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 194, 168, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 194, 168, 0.18), 0 2px 8px rgba(0, 0, 0, 0.12)',
        'result': '0 4px 24px rgba(0, 194, 168, 0.15)',
        'glow': '0 0 20px rgba(0, 194, 168, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 194, 168, 0.3)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0F1B2D 0%, #1A3050 50%, #0F2540 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00C2A8 0%, #00A890 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(0,194,168,0.1) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
