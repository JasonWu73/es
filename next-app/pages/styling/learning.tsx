import Head from 'next/head';
import Layout from '@/components/layout/layout';

export default function Learning() {
  return (
    <Layout>
      <Head>
        <title>Learning Tailwind CSS</title>
      </Head>

      <h1 className="text-3xl font-bold">Learning Tailwind CSS</h1>
    </Layout>
  );
}
