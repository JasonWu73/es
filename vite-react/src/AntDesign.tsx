import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';

// 由于 antd 组件的默认文案是英文, 所以需要修改为中文
dayjs.locale('zh-cn');

interface Props {
  children: React.ReactNode;
}

export default function AntDesign({ children }: Props) {
  return (
    <ConfigProvider locale={zhCN}>
      {children}
    </ConfigProvider>
  );
}
