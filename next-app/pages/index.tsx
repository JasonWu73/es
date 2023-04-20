import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Next.js + Tailwind CSS</h1>

      <ul>
        <Link href="/beauty/bullseye">靶心</Link>
      </ul>
    </main>
  );
}
