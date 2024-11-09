import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/back':{
        target: process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:3000/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  plugins: [react()],
})
