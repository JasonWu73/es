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
    <div style={{ textAlign: 'center', marginTop: '2%' }}>
      <Space direction="vertical" style={{ width: '95%' }}>
        <Skeleton active title={false} paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={false} title={{ width: '40%' }} />
        <Skeleton active title={false} paragraph={{ rows: 3 }} />
      </Space>
    </div>
  );
}
