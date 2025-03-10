import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {},
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'MapA11y',
      fileName: format => `mapa11y.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-i18next'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-i18next': 'ReactI18next',
        },
      },
    },
  },
});
