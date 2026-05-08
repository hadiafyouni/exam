/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                dark: 'var(--color-dark)',
                info: 'var(--color-info)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
            }
        },
    },
    plugins: [],
}