/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        'primary-hover': '#1E40AF',
        'primary-background': '#F8FAFC',
        'primary-white': '#F6F6F9',
        'secondary-background': '#CDCDCD',
        'tertiary-background': '#E5E5E5',
        'quaternary-background': '#F0F0F0',
        'quinary-background': '#F5F5F5',
      },
    },
  },
  corePlugins: {
    preflight: false, // Desabilita Tailwind's reset para não afetar react-datepicker
  },
}
