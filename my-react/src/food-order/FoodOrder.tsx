import styles from './FoodOrder.module.scss';
import Header from './layout/Header';
import Meals from './meals/Meals';
import Cart from './cart/Cart';

export default function FoodOrder() {
  return (
    <div className={styles.app}>
      <Cart/>
      <Header/>
      <main>
        <Meals/>
      </main>
    </div>
  );
};
