import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace('/vite.svg', '/workaholic/vite.svg')
      }
    }
  ],
  base: '/workaholic/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          store: ['zustand']
        }
      }
    }
  },
  // Configurações específicas para GitHub Pages
  define: {
    __BASE_URL__: '"/workaholic/"'
  }
}) 