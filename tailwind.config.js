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
        brand: {
          coral: '#FF6B6B',
          'coral-dark': '#FF5252',
          teal: '#4ECDC4',
          'teal-dark': '#45B7B0',
          beige: '#FFF9F5',
          'beige-dark': '#F5EDE6',
          neutral: {
            50: '#FAFAF9',
            100: '#F5F5F4',
            200: '#E7E5E4',
            300: '#D6D3D1',
            400: '#A8A29E',
            500: '#78716C',
            600: '#57534E',
            700: '#44403C',
            800: '#292524',
            900: '#1C1917',
          }
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}