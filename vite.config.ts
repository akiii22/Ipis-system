import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  cacheDir: 'node_modules/.vite_temp',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Pest Scanner Diagnostics',
        short_name: 'PestScanner',
        description: 'Rapid AI pest detection and diagnostic system',
        theme_color: '#070b19',
        background_color: '#030612',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/Logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/Logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/Logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})