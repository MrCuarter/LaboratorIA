import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el archivo .env si existe
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist', // Esta es la carpeta que subirás a Hostinger
      emptyOutDir: true,
    },
    define: {
      // Esto "incrusta" la API Key en el código compilado de forma segura para el frontend
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});