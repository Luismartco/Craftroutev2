import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

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
    port: 5173,
    strictPort: true,
    https: {
      key: fs.readFileSync('craftroutev2.test+4-key.pem'),
      cert: fs.readFileSync('craftroutev2.test+4.pem'),
    },
    hmr: {
      host: 'craftroutev2.test',
      protocol: 'wss',
      clientPort: 5173 // Asegúrate que coincida con el puerto del server
    }
  },
});