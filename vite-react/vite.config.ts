import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { pages } from './pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...getPageInputs()
      }
    }
  }
});

function getPageInputs() {
  const pagesInput = {};

  (pages as string[]).forEach(page => {
    // 获取目录名, 并将 `/` 替换为 `_`
    const dirName = path.dirname(page).replace(/\//g, '_');
    // get the file name without extension
    const filename = path.parse(page).name;

    pagesInput[`${dirName}_${filename}`] = page;
  });

  console.log('pages: ', pagesInput);

  return pagesInput;
}
