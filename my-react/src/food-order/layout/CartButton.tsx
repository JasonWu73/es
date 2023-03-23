import styles from './CartButton.module.scss';
import CartIcon from '../cart/CartIcon';

export default function CartButton({ onShowCart }: Props) {
  return (
    <button className={styles.btn} onClick={onShowCart}>
      <span className={styles.icon}><CartIcon/></span>
      <span>Your cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};

interface Props {
  onShowCart: () => void;
}
