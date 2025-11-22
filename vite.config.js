import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'GKMIT - INSIDE',
        short_name: 'ReactApp',
        description: 'A React PWA built with Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }) 
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
test: {
    include: ['src/tests/**/*.test.jsx'],
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    setupFiles: ['./src/tests/setup.js'], 
  },
});
