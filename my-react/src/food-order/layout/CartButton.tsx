import styles from './CartButton.module.scss';
import CartIcon from '../cart/CartIcon';

export default function CartButton() {
  return (
    <button className={styles['cart-btn']}>
      <span className={styles.icon}><CartIcon/></span>
      <span>Your cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};
