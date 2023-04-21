import Layout from '@/components/layout/layout';
import Head from 'next/head';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found</title>
      </Head>

      <h1 className="text-3xl font-bold text-red-500 text-center">
        404! <br />
        <span className="text-gray-500 font-normal">Page Not Found :(</span>
      </h1>
    </Layout>
  );
};
