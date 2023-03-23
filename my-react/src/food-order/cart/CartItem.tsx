import styles from './CartItem.module.scss';
import { Meal } from '../model/meal';
import { useCart } from '../CartContext';

export default function CartItem({ id, name, price, quantity }: Meal) {
  const cartCtx = useCart();

  function handleRemove() {
    cartCtx.removeItem(id);
  }

  function handleAdd() {
    cartCtx.addItem({ id, name, price, quantity: 1 });
  }

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
        <button onClick={handleRemove}>-</button>
        <button onClick={handleAdd}>+</button>
      </div>
    </li>
  );
}
