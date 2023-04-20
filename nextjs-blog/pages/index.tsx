import Layout, {siteTitle} from '../components/layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import {getSortedPostsData} from '../lib/posts';
import Date from '../components/date';

export default function Home({allPostsData}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>我是我，你又是谁？</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  };
}

