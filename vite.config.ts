import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://<owner>.github.io/ft-ai-4-presentations/
export default defineConfig({
  base: '/ft-ai-4-presentations/',
  plugins: [react()],
})
