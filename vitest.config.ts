import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/components/**', 'src/test-utils/**'],
      exclude: [
        'src/components/**/*.test.{ts,tsx}',
        'src/components/Map.tsx'
      ],
      reporter: ['text', 'json', 'html'],
      all: true
    }
  },
});
