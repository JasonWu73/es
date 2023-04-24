import React from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <nav>
        <ul className={styles['nav']}>
          <li><Link to="/natours">Natours</Link></li>
        </ul>
      </nav>
    </>
  );
};
