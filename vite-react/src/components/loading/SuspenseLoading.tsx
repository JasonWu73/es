import React from 'react';
import { Skeleton, Space } from 'antd';

interface Props {
  children: React.ReactNode;
}

export default function SuspenseLoading({ children }: Props) {
  return (
    <React.Suspense fallback={<SkeletonLoading />}>
      {children}
    </React.Suspense>
  );
}

export function SkeletonLoading() {
  return (
    <Space direction="vertical" size="middle" style={{ textAlign: 'center', marginTop: '1%', width: '100%' }}>
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
      <Skeleton active paragraph={{ rows: 1, width: '40%' }} />
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
    </Space>
  );
}
