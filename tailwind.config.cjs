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
            sans: ['Nunito Sans'],
            round: ['Nunito'],
            work: ['Work Sans'],
            mono: ['Overpass Mono'],
            code: ['Red Hat Mono'],
            serif: ['PT Serif'],
            stnd: ['Roboto'],
            hand: ['Patrick Hand'],
            loop: ['Sacramento'],
            clean: ['Outfit'],
        },
    },
    plugins: [],
}
