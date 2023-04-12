import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {BrowserRouter} from 'react-router-dom';

// 由于 antd 组件的默认文案是英文, 所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import {ConfigProvider} from 'antd';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import './index.scss';

dayjs.locale('zh-cn');

NProgress.configure({showSpinner: false});

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <App/>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
