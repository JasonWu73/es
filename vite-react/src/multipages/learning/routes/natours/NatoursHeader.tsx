import React from 'react';
import styles from './Natours.module.scss';
import logo from '@/assets/natours/img/logo-white.png';

export default function NatoursHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox}>
        <img src={logo} alt="Logo" className={styles.header__logo} />
      </div>

      <div className={styles.header__textBox}>
        <h1 className={styles.headingPrimary}>
          <span className={styles.headingPrimaryMain}>Outdoors</span>
          <span className={styles.headingPrimarySub}>is where life happens</span>
        </h1>

        <a
          href="#"
          className={`${styles.btn} ${styles.btnWhite} ${styles.btnAnimated}`}
          onClick={e => e.preventDefault()}
        >
          Discover our tours
        </a>
      </div>
    </header>
  );
}
