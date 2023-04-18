import './index.scss';
import {createRoot} from 'react-dom/client';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import App from './App';
import {StrictMode} from 'react';

NProgress.configure({showSpinner: false});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
