import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve, dirname} from 'path';
import pages from './pages';

const pagesInput = {};
(pages as string[]).forEach(page => {
  pagesInput[dirname(page).replace(/\//g, '_')] = page;
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pagesInput
      },
    },
  }
});
