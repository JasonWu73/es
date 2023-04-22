import Layout from '@/components/layout/layout';
import Head from 'next/head';
import Link from 'next/link';
import { useHttp } from '@/hooks/use-http';
import { getProductsApi, ProductsPagination } from '@/api/product-api';
import { useEffect, useState } from 'react';

export default function Products() {
  const { loading, error, productsData } = useProductsData();

  return (
    <Layout>
      <Head>
        <title>All Products</title>
      </Head>

      <div className="text-center">
        <h1 className="text-3xl font-bold">All Products</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className="flex flex-col gap-1">
            {productsData && productsData.products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <li className="border-b hover:bg-slate-100">{product.title}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

function useProductsData() {
  const { loading, error, sendRequest } = useHttp();
  const [productsData, setProductsData] = useState<ProductsPagination>();

  useEffect(
    () => {
      const abortController = sendRequest(
        getProductsApi(1, 10),
        setProductsData
      );

      return () => {
        abortController.abort();
      };
    },
    []
  );

  return { loading, error, productsData };
}
