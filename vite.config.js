import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Disable source maps for smaller bundle
    sourcemap: false,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
})
