import styles from './Header.module.scss';
import MainImg from './MainImg';
import CartButton from './CartButton';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>Food Order</h1>
        <CartButton/>
      </header>
      <MainImg/>
    </>
  );
};
