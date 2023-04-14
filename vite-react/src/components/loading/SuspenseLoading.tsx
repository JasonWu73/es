import {ReactNode, Suspense} from 'react';
import {Skeleton, Space} from 'antd';

export default function SuspenseLoading({children}: { children: ReactNode }) {
  return (
    <Suspense fallback={<SkeletonLoading/>}>
      {children}
    </Suspense>
  );
}

export function SkeletonLoading() {
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Skeleton active title={false} paragraph={{rows: 3}}/>
      <Skeleton active paragraph={false} title={{width: '40%'}}/>
      <Skeleton active title={false} paragraph={{rows: 3}}/>
    </Space>
  );
}
