import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    preprocessorOptions: {
      // Include your custom Bootstrap CSS file
      scss: {
        additionalData: `@import "./src/custom-bootstrap.css";`,
      },
    },
  },
  // optimizeDeps: {
  //   include: ['chart.js', 'chartjs-adapter-moment'],
  // },
  // build: {
  //   rollupOptions: {
  //     // Your rollup options here
  //     input: 'src/main.jsx',
  //   },
  // },
  // serviceWorker: {
  //   src: 'serviceWorker.js', // Path to your service worker file
  //   // Other service worker options go here
  // },
});
