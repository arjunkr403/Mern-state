import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        '/back': {
          target: mode === 'production' ? env.VITE_BACKEND_URL : 'http://localhost:3000',
          secure: mode === 'production',
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
