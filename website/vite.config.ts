import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Web thuần React cho Open-Knowledge (886 file .md).
// Nội dung docs được build-index.mjs copy vào public/docs + public/docs-index.json,
// app fetch từng file .md lúc chạy rồi render ra HTML (react-markdown).
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1500,
  },
});
