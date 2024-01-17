import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    qrcode()
  ],
});
