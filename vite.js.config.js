import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'dist/index.js'),
            name: 'Components',
            formats:['umd','es'],
            fileName: (format) => `components.${format}.js`,
        },
        outDir: 'dist-js',
        sourcemap: true,
    },
    plugins: [
        svelte(),
    ],
});