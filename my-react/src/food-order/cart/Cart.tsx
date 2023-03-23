import styles from './Cart.module.scss';
import { DUMMY_MEALS } from '../meals/dummy-meals';

export default function Cart() {
  const orderedMeals = DUMMY_MEALS.slice(0, 2);

  return (
    <div className={styles.cart}>
      <ul className={styles.items}>
        {orderedMeals.map(meal => <li key={meal.id}>{meal.name}</li>)}
      </ul>
      <div className={styles.amount}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.controls}>
        <button>Close</button>
        <button>Order</button>
      </div>
    </div>
  );
}
