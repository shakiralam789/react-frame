/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#5E35CC',
          light: '#F3F4F6'
        },
        danger: '#EF4444',
        gray: {
          icon: '#6B7280',
          text: '#393447',
          light: '#f3f4f6'
        },
        "body-color" : "#f3f4f6",
        green: {
          light: "#EDFFF7",
        }
      }
    },
  },
  plugins: [],
};

export default tailwindConfig;
