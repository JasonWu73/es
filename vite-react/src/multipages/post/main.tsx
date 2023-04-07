import './index.scss';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {HashRouter} from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    {/* 多页面程序必须使用 HashRouter */}
    <HashRouter>
      <App/>
    </HashRouter>
  </StrictMode>
);
