import styles from './AvailableMeals.module.scss';
import { DUMMY_MEALS } from './dummy-meals';

export default function AvailableMeals() {
  const meals = DUMMY_MEALS.map(meal => <li key={meal.id}>{meal.name}</li>);

  return (
    <ul className={styles.meals}>
      {meals}
    </ul>
  );
};
