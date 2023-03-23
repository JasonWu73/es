import styles from './Cart.module.scss';
import { DUMMY_MEALS } from '../meals/dummy-meals';
import Modal from '../shared/modal/Modal';
import { useCart } from '../CartContext';

export default function Cart({ onClose }: Props) {
  const carCtx = useCart();

  return (
    <Modal onClose={onClose}>
      <div className={styles.cart}>
        <ul className={styles.items}>
          {carCtx.items.map(meal => <li key={meal.id}>{meal.name}</li>)}
        </ul>
        <div className={styles.amount}>
          <span>Total Amount</span>
          <span>{carCtx.totalAmount}</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn} onClick={onClose}>Close</button>
          <button
            className={`${styles.btn} ${styles['btn--filled']}`}
          >
            Order
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface Props {
  onClose: () => void;
}
