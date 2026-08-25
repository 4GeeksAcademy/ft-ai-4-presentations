import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const multiplexTokenProxy = {
  '/__multiplex/token': {
    target: 'https://multiplex.up.railway.app',
    changeOrigin: true,
    rewrite: () => '/token',
  },
} as const

// GitHub Pages project site: https://<owner>.github.io/ft-ai-4-presentations/
export default defineConfig({
  base: '/ft-ai-4-presentations/',
  plugins: [react()],
  server: { proxy: { ...multiplexTokenProxy } },
  preview: { proxy: { ...multiplexTokenProxy } },
})
