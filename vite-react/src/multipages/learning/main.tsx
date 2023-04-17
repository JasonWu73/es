import './index.scss';
import {createRoot} from 'react-dom/client';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import App from './App';

NProgress.configure({showSpinner: false});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
