import styles from './CartItem.module.scss';
import { Meal } from '../model/meal';

export default function CartItem({ id, name, price, quantity }: Meal) {
  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <h2>{name}</h2>
        <div className={styles.amount}>
          <div className={styles.price}>{`$${price}`}</div>
          <div className={styles.quantity}>{`x${quantity}`}</div>
        </div>
      </div>
      <div className={styles.controls}>
        <button>-</button>
        <button>+</button>
      </div>
    </li>
  );
}
