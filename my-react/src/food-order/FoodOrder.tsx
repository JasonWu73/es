import styles from './FoodOrder.module.scss';
import Header from './layout/Header';
import Meals from './meals/Meals';

export default function FoodOrder() {
  return (
    <div className={styles.app}>
      <Header/>
      <main>
        <Meals/>
      </main>
    </div>
  );
};
