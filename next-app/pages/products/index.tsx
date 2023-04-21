import Layout from '@/components/layout/layout';
import Head from 'next/head';

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>All Products</title>
      </Head>

      <h1 className="text-3xl font-bold">All Products</h1>
    </Layout>
  );
}
