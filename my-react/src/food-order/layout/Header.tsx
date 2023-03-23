import styles from './Header.module.scss';
import MainImg from './MainImg';
import CartButton from './CartButton';

export default function Header({ onShowCart }: Props) {
  return (
    <>
      <header className={styles.header}>
        <h1>Food Order</h1>
        <CartButton onShowCart={onShowCart}/>
      </header>
      <MainImg/>
    </>
  );
};

interface Props {
  onShowCart: () => void;
}
