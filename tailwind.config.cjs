/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'salt': '#FAFAFA',
                'parchment': '#F1E9D2',
                'dark-parchment': '#C1B48A',
                'grey': '#8B929E',
                'navy': '#1B2A41',
                'red': '#984447',
                'green': '#1B998B',
                'blue': '#6A7FDB'
            }
        },
        fontFamily: {
            sans: ['IBM Plex Sans', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
            playfair: ['Playfair Display', 'serif'],
            robotomono: ['Roboto Mono', 'monospace'],
        },
    },
    plugins: [],
}
