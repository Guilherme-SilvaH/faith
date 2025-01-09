import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que a saída seja para o diretório correto
  },
  server: {
    port: 3000,
  },
  base: './', // Necessário para deploy relativo
});

