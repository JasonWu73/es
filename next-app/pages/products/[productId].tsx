import Layout from '@/components/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductDetail() {
  const router = useRouter();
  console.log(router.query.productId);

  return (
    <Layout>
      <Head>
        <title>Product Detail</title>
      </Head>

      <h1 className="text-3xl font-bold">Product Detail</h1>
    </Layout>
  );
}
