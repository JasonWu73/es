import React from 'react';
import styles from './Natours.module.scss';
import Logo from './img/logo-white.png';

export default function NatoursHeader() {
  return (
    <header className={styles.header}>
      <div className={styles['logo-box']}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles['text-box']}>
        <h1 className={styles['heading-primary']}>
          <span className={styles['heading-primary--main']}>Outdoors</span>
          <span className={styles['heading-primary--sub']}>is where life happens</span>
        </h1>

        <a
          href="#"
          className={`${styles.btn} ${styles['btn-white']}`}
          onClick={e => e.preventDefault()}
        >
          Discover our tours
        </a>
      </div>
    </header>
  );
}
