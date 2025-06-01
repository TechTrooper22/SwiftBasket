import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    allowedHosts: [
      "554c-2401-4900-79fb-aba9-b1d7-b909-4f99-978.ngrok-free.app",
    ],
  }
});
