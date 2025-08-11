import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,

  }), react(), tailwind()],
  base: '/elevvo-internship-submission/freelance-dashboard',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
