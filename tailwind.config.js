/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        vertex: {
          ink: '#03252D',
          apexTeal: '#0B4551',
          prismBlue: '#72C6E8',
          quartzGrey: '#D4D3D1',
          polarWhite: '#FEFEFE',
          facetDeep: '#20414B',
          facetTeal: '#2D636E',
          facetMedium: '#367480',
          facetBlue: '#5896A6',
          facetLight: '#68A9BB',
          facetIce: '#B6D1D8',
          // Theme functional aliases
          darkBg: '#071A1F',
          darkSurface: '#0D272C',
          darkSurfaceElevated: '#123B45',
          darkSurfaceHover: '#174A55',
          lightBg: '#F7FAFB',
          lightSurface: '#FEFEFE',
          lightSurfaceSubtle: '#EDF4F5',
        },
        jira: {
          dark: '#071A1F',
          darker: '#03252D',
          sidebar: '#0D272C',
          border: '#123B45',
          hover: '#174A55',
          blue: '#72C6E8',
          bgLight: '#F7FAFB',
          sidebarLight: '#FEFEFE',
          borderLight: '#D4D3D1'
        }
      }
    },
  },
  plugins: [],
}
