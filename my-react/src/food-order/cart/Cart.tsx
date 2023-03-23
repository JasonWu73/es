import styles from './Cart.module.scss';
import Modal from '../shared/modal/Modal';
import { useCart } from '../CartContext';

export default function Cart({ onClose }: Props) {
  const cartCtx = useCart();
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal onClose={onClose}>
      <div className={styles.cart}>
        <ul className={styles.items}>
          {cartCtx.items.map(meal => <li key={meal.id}>{meal.name}</li>)}
        </ul>
        <div className={styles.amount}>
          <span>Total Amount</span>
          <span>{`$${cartCtx.totalAmount}`}</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={onClose}>Close</button>
          {hasItems &&
            <button
              className={`${styles.btn} ${styles['btn--filled']}`}
            >
              Order
            </button>
          }
        </div>
      </div>
    </Modal>
  );
}

interface Props {
  onClose: () => void;
}
