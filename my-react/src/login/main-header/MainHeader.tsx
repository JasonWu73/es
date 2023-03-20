import styles from './MainHeader.module.scss';
import Navigation from './Navigation';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <h1>Login Demo</h1>
      <Navigation/>
    </header>
  );
}
