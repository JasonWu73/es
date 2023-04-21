import Layout from '@/components/layout/layout';
import Head from 'next/head';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>页面不存在</title>
      </Head>

      <h2 className="text-2xl font-bold">您访问的页面不存在 :(</h2>
    </Layout>
  );
};
