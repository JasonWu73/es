import Layout from '@/components/layout/layout';
import Head from 'next/head';
import Link from 'next/link';

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>All Products</title>
      </Head>

      <h1 className="text-3xl font-bold">All Products</h1>

      <ul>
        <Link href="/products/1">
          <li>Product 1</li>
        </Link>
      </ul>
    </Layout>
  );
}
