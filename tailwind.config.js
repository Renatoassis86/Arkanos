module.exports = {
  content: [
    './backend/templates/**/*.html',
    './backend/templates/arkanos/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto','Helvetica','Arial','sans-serif'],
      },
      colors: {
        arkanos: {
          blue:  '#0B5FA5', // Aion (sabedoria)
          red:   '#D62828', // Kael (coragem)
          pink:  '#E91E63', // Lyra (imaginação)
          gold:  '#F2C94C',
          beige: '#F7F2E7',
        },
      },
      boxShadow: {
        glow: '0 10px 30px rgba(11,95,165,.18)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-6px)' } },
        pulseSoft: { '0%,100%': { opacity:.9 }, '50%': { opacity:1 } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
