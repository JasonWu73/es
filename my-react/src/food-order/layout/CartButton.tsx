import styles from './CartButton.module.scss';
import CartIcon from '../cart/CartIcon';
import { useCart } from '../CartContext';

export default function CartButton({ onShowCart }: Props) {
  const cartCtx = useCart();

  return (
    <button className={styles.btn} onClick={onShowCart}>
      <span className={styles.icon}><CartIcon/></span>
      <span>Your cart</span>
      <span className={styles.badge}>{cartCtx.items.length}</span>
    </button>
  );
};

interface Props {
  onShowCart: () => void;
}
