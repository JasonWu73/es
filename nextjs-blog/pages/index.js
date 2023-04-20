import Layout, {siteTitle} from '../components/layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>我是我，你又是谁？</p>
        <p>
          Go to <Link href='/posts/first-post'>first post page</Link>
        </p>
      </section>
    </Layout>
  );
}
