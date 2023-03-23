import styles from './Cart.module.scss';
import { DUMMY_MEALS } from '../meals/dummy-meals';
import Modal from '../shared/modal/Modal';

export default function Cart() {
  const orderedMeals = DUMMY_MEALS.slice(0, 2);

  return (
    <Modal>
      <div className={styles.cart}>
        <ul className={styles.items}>
          {orderedMeals.map(meal => <li key={meal.id}>{meal.name}</li>)}
        </ul>
        <div className={styles.amount}>
          <span>Total Amount</span>
          <span>35.62</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.btn}>Close</button>
          <button className={`${styles.btn} ${styles['btn--filled']}`}>Order</button>
        </div>
      </div>
    </Modal>
  );
}
