const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './node_modules/@8thday/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.rose,
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
        ...theme('height'),
      }),
      maxHeight: (theme) => ({
        ...theme('spacing'),
        ...theme('height'),
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
        ...theme('width'),
      }),
      maxWidth: (theme) => ({
        ...theme('spacing'),
        ...theme('width'),
      }),
      inset: (theme) => ({
        ...theme('spacing'),
      }),
      spacing: {
        36: '9rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '100vw': '100vw',
        '100dvh': '100dvh',
        '100svh': '100svh',
        content: 'calc(100vh - 3rem)',
        contentD: 'calc(100dvh - 3rem)',
        contentS: 'calc(100svh - 3rem)',
        screenD: '100dvh',
        screenS: '100svh',
      },
      boxShadow: {
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -1px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    animation: {
      fadeout: 'fadeout 3s linear forwards',
    },
    keyframes: {
      fadeout: {
        '0%': { opacity: 1, transform: 'scale(1)' },
        '5%': { opacity: 1, transform: 'scale(1.1)' },
        '100%': { opacity: 0, transform: 'scale(0.8)' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
