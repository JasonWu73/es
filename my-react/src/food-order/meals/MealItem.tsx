import styles from './MealItem.module.scss';

export default function MealItem({ name, description, price }: Props) {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.item}>
      <div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div>
        {/* // TODO: Amount component */}
      </div>
    </li>
  );
};

interface Props {
  name: string,
  description: string,
  price: number
}
