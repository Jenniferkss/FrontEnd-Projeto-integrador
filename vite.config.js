import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const BACKEND_TARGET = 'https://backend-projeto-integrador-rana.onrender.com';

const proxyConfig = {
    '/api': {
        target: BACKEND_TARGET,
        changeOrigin: true,
        secure: true,
    },
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: proxyConfig,
    },
    preview: {
        proxy: proxyConfig,
    },
});
