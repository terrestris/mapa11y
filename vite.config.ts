import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  if (command === 'build' && process.env.BUILD_TYPE === 'lib') {
    // Library build configuration for npm package
    return {
      plugins: [react()],
      css: {},
      build: {
        lib: {
          entry: './src/index.ts',
          name: 'MapA11y',
          fileName: format => `mapa11y.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react-i18next', 'i18next'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react-i18next': 'ReactI18next',
              'i18next': 'i18next'
            },
          },
        },
      },
    };
  } else {
    // Web app build configuration for GitHub Pages
    return {
      plugins: [react()],
      css: {},
      base: '/mapa11y/',
      build: {
        outDir: 'dist-web',
      }
    };
  }
});
