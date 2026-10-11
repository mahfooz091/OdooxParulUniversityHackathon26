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
        surface: '#F8FAFC',
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
        muted: '#94A3B8',
        error: '#EF4444',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 50%, #0E7490 100%)',
        'gradient-hero':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(20, 184, 166, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(6, 182, 212, 0.2), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(16, 185, 129, 0.15), transparent)',
        'gradient-mesh':
          'linear-gradient(180deg, #F0FDFA 0%, #ECFEFF 40%, #F8FAFC 100%)',
        'glow-cyan': 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(20, 184, 166, 0.5)',
        'glow-sm': '0 0 24px -8px rgba(6, 182, 212, 0.45)',
        glass: '0 8px 32px rgba(11, 20, 38, 0.08)',
        card: '0 4px 6px -1px rgba(11, 20, 38, 0.06), 0 2px 4px -2px rgba(11, 20, 38, 0.04)',
        'clay-card':
          '16px 16px 36px rgba(180, 195, 215, 0.45), -12px -12px 28px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9), inset -2px -2px 4px rgba(180, 195, 215, 0.2)',
        'clay-card-sm':
          '10px 10px 22px rgba(180, 195, 215, 0.35), -8px -8px 18px rgba(255, 255, 255, 0.95), inset 1px 1px 3px rgba(255, 255, 255, 0.8), inset -1px -1px 3px rgba(180, 195, 215, 0.15)',
        'clay-btn':
          '0 10px 22px -3px rgba(13, 148, 136, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -3px 4px rgba(15, 118, 110, 0.35)',
        'clay-btn-secondary':
          '8px 8px 18px rgba(180, 195, 215, 0.35), -6px -6px 16px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9), inset -2px -2px 4px rgba(180, 195, 215, 0.2)',
        'clay-inset':
          'inset 3px 3px 6px rgba(180, 195, 215, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.95)',
        'clay-inset-focus':
          'inset 2px 2px 5px rgba(13, 148, 136, 0.15), inset -2px -2px 4px rgba(255, 255, 255, 0.95), 0 0 0 3px rgba(20, 184, 166, 0.3)',
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
