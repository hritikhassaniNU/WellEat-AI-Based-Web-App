import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000, // Replace with your desired port number
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Well Eat - AI Powered Nutrition',
        short_name: 'Well Eat',
        description: 'Your personal nutritionist',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'fullscreen',
        icons: [
          {
            src: 'welleat-64x64.png', // You need to provide these icon files
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'welleat-128x128.png', // You need to provide these icon files
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'welleat-192x192.png', // You need to provide these icon files
            sizes: '192x192.png',
            type: 'image/png',
          },
          {
            src: 'welleat-512x512.png', // You need to provide these icon files
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
