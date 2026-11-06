import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Customer Storefront Vite Configuration (Port 5173)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
})