import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

// 由于 antd 组件的默认文案是英文, 所以需要修改为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import {ConfigProvider} from 'antd';

import './index.scss';

dayjs.locale('zh-cn');

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App/>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
