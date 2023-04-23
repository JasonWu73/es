import React from 'react';
import styles from './Natours.module.scss';
import Logo from './img/logo-white.png';

export default function NatoursHeader() {
  return (
    <header className={styles['header']}>
      <div className={styles['header__logo-box']}>
        <img src={Logo} alt="Logo" className={styles['header__logo']} />
      </div>

      <div className={styles['header__text-box']}>
        <h1 className={styles['heading-primary']}>
          <span className={styles['heading-primary--main']}>Outdoors</span>
          <span className={styles['heading-primary--sub']}>is where life happens</span>
        </h1>

        <a
          href="#"
          className={`${styles['btn']} ${styles['btn--white']} ${styles['btn--animated']}`}
          onClick={e => e.preventDefault()}
        >
          Discover our tours
        </a>
      </div>
    </header>
  );
}
