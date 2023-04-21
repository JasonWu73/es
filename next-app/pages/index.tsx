import Link from 'next/link';
import Layout from '@/components/layout/layout';
import Head from 'next/head';

export const ROUTES: { link: string, title: string; }[] = [
  { link: '/styling/learning', title: 'Tailwind CSS' },
  { link: '/b', title: '导航2' },
  { link: '/c', title: '导航3' },
  { link: '/d', title: '导航4' },
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
