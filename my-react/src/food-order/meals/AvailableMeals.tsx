import styles from './AvailableMeals.module.scss';
import { DUMMY_MEALS } from './dummy-meals';
import Card from '../shared/card/Card';

export default function AvailableMeals() {
  const meals = DUMMY_MEALS.map(meal => <li key={meal.id}>{meal.name}</li>);

  return (
    <div className={styles.meals}>
      <Card>
        <ul>
          {meals}
        </ul>
      </Card>
    </div>
  );
};
