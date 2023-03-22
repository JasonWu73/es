import styles from './Header.module.scss';
import MainImg from './MainImg';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>Food Order</h1>
        <button>Cart</button>
      </header>
      <MainImg/>
    </>
  );
};
