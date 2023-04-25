import React from 'react';
import { Layout, Typography } from 'antd';

interface Props {
  style?: React.CSSProperties;
}

export default function FooterLayout({ style }: Props) {
  return (
    <Layout.Footer style={{ textAlign: 'center', ...style }}>
      <Copyright />
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `${new Date().getFullYear()} 吴仙杰个人演示项目`;

function Copyright({ message = DEFAULT_MESSAGE }) {
  return (
    <>
      <Typography.Text type="secondary">
        &copy; {message}
      </Typography.Text>
    </>
  );
}
