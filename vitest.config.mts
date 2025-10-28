import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      quasar: path.resolve(__dirname, './node_modules/quasar/dist/quasar.esm.prod.js'),
      components: path.resolve(__dirname, './src/components'),
      src: path.resolve(__dirname, './src'),
      boot: path.resolve(__dirname, './src/boot'),
      assets: path.resolve(__dirname, './src/assets'),
      layouts: path.resolve(__dirname, './src/layouts'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup-file.ts',
    include: [
      // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
      // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
  plugins: [
    // @ts-expect-error Type issue with Quasar Vite plugin
    vue({
      template: { transformAssetUrls },
    }),
    // @ts-expect-error Type issue with Quasar Vite plugin
    quasar({
      sassVariables: 'src/quasar-variables.scss',
    }),
    // @ts-expect-error Type issue with Quasar Vite plugin
    tsconfigPaths(),
  ],
});
