import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue2'

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: './src',
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    Vue(),
  ],
})
