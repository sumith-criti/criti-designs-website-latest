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
        primary: '#8AA46A',
        secondary: '#2D2D2D',
        background: '#F8F8F6',
        // Keep old colors for backward compatibility
        charcoal: '#2D2D2D',
        'muted-gold': '#8AA46A',
        'gold-accent': '#7A9260',
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        // Keep old fonts for backward compatibility
        poppins: ['var(--font-lato)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}



