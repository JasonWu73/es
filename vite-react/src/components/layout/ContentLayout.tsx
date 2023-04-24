import React from 'react';
import { Layout, theme } from 'antd';

interface Props {
  children: React.ReactNode;
}

export function ContentLayout({ children }: Props) {
  const { token: { colorBgContainer } } = theme.useToken();

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
