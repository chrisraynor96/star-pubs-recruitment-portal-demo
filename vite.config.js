import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const sitecore = mode === 'sitecore';

  return {
    plugins: [react()],
    base: sitecore ? '/Assets/StarPubsRecruitment/' : '/star-pubs-recruitment-portal-demo/',
    build: {
      outDir: sitecore ? 'dist-sitecore' : 'dist',
      target: 'es2018',
      manifest: sitecore,
      rollupOptions: sitecore ? {
        output: {
          entryFileNames: 'assets/app.js',
          chunkFileNames: 'assets/chunk-[name].js',
          assetFileNames: (assetInfo) => assetInfo.name && assetInfo.name.endsWith('.css')
            ? 'assets/app.css'
            : 'assets/[name][extname]'
        }
      } : undefined
    }
  };
});
