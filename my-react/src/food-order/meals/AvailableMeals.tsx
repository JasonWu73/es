import styles from './AvailableMeals.module.scss';
import { DUMMY_MEALS } from './dummy-meals';
import Card from '../shared/card/Card';
import MealItem from './MealItem';

export default function AvailableMeals() {
  return (
    <div className={styles.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map(meal => <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />)}
        </ul>
      </Card>
    </div>
  );
};
