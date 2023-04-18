import {ReactNode} from 'react';
import {Layout, theme} from 'antd';

export function ContentLayout({children}: { children: ReactNode }) {
  const {token: {colorBgContainer}} = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: '2.4rem',
        margin: 0,
        minHeight: '28rem',
        background: colorBgContainer
      }}
    >
      {children}
    </Layout.Content>
  );
}
