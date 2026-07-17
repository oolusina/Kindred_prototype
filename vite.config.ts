import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // GitHub Pages needs the repo subpath; local/dev should stay at /.
  base: command === 'build' ? '/Kindred_prototype/' : '/',
  plugins: [react(), tailwindcss()],
}))
