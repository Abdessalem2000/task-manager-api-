import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js?v=999`,
        chunkFileNames: `assets/[name]-[hash].js?v=999`,
        assetFileNames: `assets/[name]-[hash].[ext]?v=999`
      }
    }
  }
})
