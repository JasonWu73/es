import styles from './FoodOrder.module.scss';
import Header from './layout/Header';
import Meals from './meals/Meals';
import Cart from './cart/Cart';
import { useState } from 'react';
import { CartProvider } from './CartContext';

export default function FoodOrderApp() {
  const [showCart, setShowCart] = useState(false);

  function handleShowCart() {
    setShowCart(true);
  }

  function handleHideCart() {
    setShowCart(false);
  }

  return (
    <CartProvider>
      <div className={styles.app}>
        {showCart && <Cart onClose={handleHideCart}/>}
        <Header onShowCart={handleShowCart}/>
        <main>
          <Meals/>
        </main>
      </div>
    </CartProvider>
  );
};
