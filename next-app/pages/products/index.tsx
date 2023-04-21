import Layout from '@/components/layout/layout';
import Head from 'next/head';
import Link from 'next/link';
import { useHttp } from '@/hooks/use-http';
import { getProductsApi } from '@/api/product-api';
import { useEffect } from 'react';

export default function Products() {
  const productsData = useProductsData();

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

function useProductsData() {
  const { sendRequest } = useHttp();

  useEffect(
    () => {
      const abortController = sendRequest(
        getProductsApi(1, 10),
        (data) => console.log(data),
      );

      return () => {
        abortController.abort();
      };
    },
    [],
  );
}
