import React from 'react';
import styles from './Home.module.scss';
import { usePageTitle } from '@/hooks/use-page-title';
import { Link } from 'react-router-dom';

export default function Home() {
  usePageTitle('Learning');

  return (
    <>
      <nav>
        <ul className={styles.nav}>
          <li><Link to="/natours">Natours</Link></li>
        </ul>
      </nav>
    </>
  );
};
