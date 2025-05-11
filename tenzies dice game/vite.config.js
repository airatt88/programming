import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/programming/tenzies%20dice%20game/',
  plugins: [react()],
})
