import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dedicated Admin Portal Vite Configuration (Port 5174)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: 'admin.html'
    }
  }
})