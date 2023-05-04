import React from 'react';
import { Layout } from 'antd';
import { useTitle } from '@/hooks/use-page';
import HeaderLayout from '@/components/layout/HeaderLayout';
import RouteError from '@/components/error/RouteError';
import FooterLayout from '@/components/layout/FooterLayout';

interface Props {
  code?: number;
  message?: string;
}

export default function ErrorPage({ code, message }: Props) {
  useTitle(code + '');

  return (
    <Layout style={{ minHeight: '100dvh' }}>
      <HeaderLayout />

      <Layout.Content style={{ display: 'flex' }}>
        <RouteError code={code} message={message} />
      </Layout.Content>

      <FooterLayout />
    </Layout>
  );
}
