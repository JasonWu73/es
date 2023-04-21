import Link from 'next/link';
import Layout from '@/components/layout/layout';
import Head from 'next/head';
import { AiFillCustomerService, AiFillFire } from 'react-icons/ai';
import React from 'react';

export const ROUTES: { link: string, title: React.ReactNode; }[] = [
  { link: '/styling/learning', title: <><AiFillFire /> Tailwind CSS</> },
  { link: '/products', title: <><AiFillCustomerService /> Products</> },
];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <h1 className="text-3xl font-bold">
        Next.js + Tailwind CSS
      </h1>

      <ul>
        <Link href="/styling/learning">
          <li>Learning Tailwind CSS</li>
        </Link>
      </ul>
    </Layout>
  );
}
