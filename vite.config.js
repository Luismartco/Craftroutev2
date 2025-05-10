import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'craftroutev2.test',
        hmr: { host: 'craftroutev2.test' },
        //host: 'localhost', // Esto fuerza el uso de IPv4
        port: 5173,         // Opcional: puedes especificar el puerto si quieres
        https: false, // ESTO HABILITA HTTPS EN VITE
    //host: 'craftroutev2.test',
    
    },
});
