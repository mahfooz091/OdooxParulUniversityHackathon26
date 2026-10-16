/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#14B8A6', dark: '#0D9488', light: '#5EEAD4' },
        accent: '#F59E0B',
        gold: { DEFAULT: '#D4AF37', light: '#F5E6C8' },
        dark: '#1E293B',
        navy: { DEFAULT: '#0B1426', light: '#162038', muted: '#1E3A5F' },
        ocean: { DEFAULT: '#0E7490', light: '#06B6D4' },
        emerald: { DEFAULT: '#10B981', soft: '#D1FAE5' },
        surface: '#F4FAFA',
        neu: {
          bg: '#F4FAFA',
          surface: '#FFFFFF',
          mint: '#EBF7F5',
          teal: '#12B8A9',
          cyan: '#06B6D4',
          navy: '#111B30',
          slate: '#586780',
          border: '#E2EBEB',
          borderDark: '#D1DFDF',
          muted: '#8C9BAE',
        },
        glass: { border: 'rgba(255,255,255,0.12)', fill: 'rgba(255,255,255,0.06)' },
        clay: {
          bg: '#F3F6FA',
          card: '#FFFFFF',
          input: '#EEF2F7',
          mint: '#E6F7F2',
          sky: '#E8F2FC',
          lavender: '#F1ECFD',
          peach: '#FDF2EB',
        },
        muted: '#586780',
        error: '#EF4444',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #12B8A9 0%, #06B6D4 50%, #0E7490 100%)',
        'gradient-hero':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18, 184, 169, 0.22), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(6, 182, 212, 0.18), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(18, 184, 169, 0.12), transparent)',
        'gradient-mesh':
          'linear-gradient(180deg, #F4FAFA 0%, #EBF7F5 40%, #F4FAFA 100%)',
        'glow-cyan': 'radial-gradient(circle, rgba(18, 184, 169, 0.35) 0%, transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(18, 184, 169, 0.45)',
        'glow-sm': '0 0 24px -8px rgba(6, 182, 212, 0.4)',
        glass: '0 8px 32px rgba(17, 27, 48, 0.08)',
        card: '8px 8px 20px rgba(40, 70, 80, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)',
        'neu-raised':
          '8px 8px 20px rgba(40, 70, 80, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)',
        'neu-raised-sm':
          '5px 5px 12px rgba(40, 70, 80, 0.07), -5px -5px 12px rgba(255, 255, 255, 0.95)',
        'neu-raised-lg':
          '14px 14px 30px rgba(40, 70, 80, 0.1), -12px -12px 28px rgba(255, 255, 255, 0.95)',
        'neu-inset':
          'inset 3px 3px 7px rgba(40, 70, 80, 0.08), inset -3px -3px 7px rgba(255, 255, 255, 0.9)',
        'neu-inset-focus':
          'inset 2px 2px 5px rgba(18, 184, 169, 0.18), inset -2px -2px 5px rgba(255, 255, 255, 0.95), 0 0 0 3px rgba(18, 184, 169, 0.25)',
        'neu-btn':
          '5px 5px 14px rgba(40, 70, 80, 0.1), -5px -5px 14px rgba(255, 255, 255, 0.95)',
        'neu-btn-primary':
          '0 8px 20px -3px rgba(18, 184, 169, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(15, 118, 110, 0.3)',
        'neu-btn-pressed':
          'inset 2px 2px 5px rgba(40, 70, 80, 0.12), inset -2px -2px 5px rgba(255, 255, 255, 0.9)',
        'clay-card':
          '8px 8px 20px rgba(40, 70, 80, 0.08), -8px -8px 20px rgba(255, 255, 255, 0.9)',
        'clay-card-sm':
          '5px 5px 12px rgba(40, 70, 80, 0.07), -5px -5px 12px rgba(255, 255, 255, 0.95)',
        'clay-btn':
          '0 8px 20px -3px rgba(18, 184, 169, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(15, 118, 110, 0.3)',
        'clay-btn-secondary':
          '5px 5px 14px rgba(40, 70, 80, 0.1), -5px -5px 14px rgba(255, 255, 255, 0.95)',
        'clay-inset':
          'inset 3px 3px 7px rgba(40, 70, 80, 0.08), inset -3px -3px 7px rgba(255, 255, 255, 0.9)',
        'clay-inset-focus':
          'inset 2px 2px 5px rgba(18, 184, 169, 0.18), inset -2px -2px 5px rgba(255, 255, 255, 0.95), 0 0 0 3px rgba(18, 184, 169, 0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1s infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'gradient-x': 'gradient-x 12s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
