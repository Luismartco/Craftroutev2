import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',  // Punto de entrada principal
                'resources/js/Pages/**/*.jsx'  // Todos los componentes de página
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        https: false,
        hmr: {
            host: 'localhost',
            protocol: 'ws'
        },
    },
    build: {
        rollupOptions: {
            input: 'resources/js/app.jsx',  // Especifica el punto de entrada para la compilación
        },
    },
});