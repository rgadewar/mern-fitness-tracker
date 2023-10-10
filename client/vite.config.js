import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      // Your rollup options here
      input: 'src/main.jsx',
      // Specify external dependencies here
      external: ['react', 'react-dom', 'redux', 'react-redux'],
    },
    outDir: 'dist', // Specify the output directory for the build
  },
  serviceWorker: {
    src: 'serviceWorker.js',
    // Other service worker options go here
  },
});
