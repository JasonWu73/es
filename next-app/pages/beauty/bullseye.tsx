import Head from 'next/head';
import Link from 'next/link';

export default function Bullseye() {
  return (
    <>
      <Head>
        <title>靶心</title>
      </Head>

      <h1>靶心</h1>

      <div className="bg-emerald-500 w-52 h-52"></div>

      <div>
        <Link href="/">← 返回至首页</Link>
      </div>
    </>
  );
}
