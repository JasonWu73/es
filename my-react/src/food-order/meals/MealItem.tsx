import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';

export default function MealItem({ name, description, price }: Props) {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.item}>
      <div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <MealItemForm/>
    </li>
  );
};

interface Props {
  name: string,
  description: string,
  price: number
}
