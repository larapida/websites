/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/www',
    server: {
      port: Number.parseInt(env.PORT ?? '3000') + 1000,
      host: 'localhost',
    },
    preview: {
      port: Number.parseInt(env.PORT ?? '3000') + 2000,
      host: 'localhost',
    },
    plugins: [!process.env.VITEST && reactRouter()],
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
