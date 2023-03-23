import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import { useCart } from '../CartContext';

export default function MealItem({ id, name, description, price }: Props) {
  const formattedPrice = `$${price.toFixed(2)}`;
  const cartCtx = useCart();

  function handleAddClick(quantity: number) {
    cartCtx.addItem({ id, name, description, price, quantity });
  }

  return (
    <li className={styles.item}>
      <div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <MealItemForm onAddClick={handleAddClick}/>
    </li>
  );
};

interface Props {
  id: string,
  name: string,
  description: string,
  price: number
}
