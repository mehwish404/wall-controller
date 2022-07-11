import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/wallcontroller': {
        target: 'http://localhost:8080'
      }
    }
  },
  base: "/wallcontroller/",
  build: {
    outDir: "../src/main/resources/static/wallcontroller",
    emptyOutDir: true
  }
})
