import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueform from '@vueform/vueform/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueform()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
})
