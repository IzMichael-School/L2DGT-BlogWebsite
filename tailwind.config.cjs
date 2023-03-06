/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'salt': '#FAFAFA',
                'grey': '#8B929E',
                'navy': '#1B2A41',
                'red': '#984447',
                'green': '#1B998B',
                'blue': '#6A7FDB'
            }
        },
        fontFamily: {
            sans: ['IBM Plex Sans', 'sans-serif'],
            inter: ['Inter', 'sans-serif']
        },
    },
    plugins: [],
}
