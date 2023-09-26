import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~@": __dirname,
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://43.138.15.137:3000', //实际请求地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        },
    }
}


})
