import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Deploy at root by default. Override with VITE_BASE_URL when needed.
    base: env.VITE_BASE_URL || '/',
    plugins: [
      react(),
      qrcode()
    ],
  };
});
