import Layout from '@/components/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductApi, Product } from '@/api/product-api';
import { useHttp } from '@/hooks/use-http';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail() {
  const { loading, error, product } = useProduct();

  return (
    <Layout>
      <Head>
        <title>Product Detail</title>
      </Head>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && !product && (
        <h1 className="text-3xl font-bold text-center">No Data</h1>
      )}
      {!loading && !error && product && (
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <Image
            src={product.thumbnail}
            alt={`${product.title} Image`}
            width={500}
            height={281}
          />
          <p>{product.description}</p>
        </div>
      )}
      <div className="text-right mr-6 mt-4">
        <Link
          href="/products"
          className="font-bold text-blue-500 hover:underline"
        >
          Go To Product List
        </Link>
      </div>
    </Layout>
  );
}

function useProduct() {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const { loading, error, sendRequest } = useHttp();

  const productId = router.query.productId;

  useEffect(
    () => {
      if (!productId || isNaN(+productId)) return;

      const abortController = sendRequest(
        getProductApi(+productId!),
        setProduct
      );

      return () => {
        abortController.abort();
      };
    },
    [productId]
  );

  return { loading, error, product };
}
