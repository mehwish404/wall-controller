import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/thewall': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  },
  base: "/wallcontroller/",
  build: {
    outDir: "../src/main/resources/static/wallcontroller",
    emptyOutDir: true
  }
})
