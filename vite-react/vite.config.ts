import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve, dirname, parse} from 'path';
import {pages} from './pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...getPageInputs()
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'react';
          }
        }
      }
    }
  }
});

function getPageInputs() {
  const pagesInput = {};

  (pages as string[]).forEach(page => {
    const dirName = dirname(page).replace(/\//g, '_'); // 获取目录名, 并将 `/` 替换为 `_`
    const filename = parse(page).name; // Get the file name without extension
    pagesInput[`${dirName}_${filename}`] = page;
  });

  console.log('pages: ', pagesInput);

  return pagesInput;
}
