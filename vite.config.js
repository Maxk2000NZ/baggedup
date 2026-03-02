import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: 'app.html',
        guide: 'public/guide.html',
        about: 'public/about.html',
        blog: 'public/blog.html',
      }
    }
  }
})