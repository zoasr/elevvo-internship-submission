import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/elevvo-internship-submission/job-application-tracker/',
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
  }), viteReact(), tailwindcss() ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
