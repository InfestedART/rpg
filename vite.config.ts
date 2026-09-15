import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
