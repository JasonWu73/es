import { createContext, ReactNode, useContext, useReducer } from 'react';

const CartContext = createContext<{
  items: Meal[],
  totalAmount: number,
  addItem: (item: Meal) => void,
  removeItem: (id: string) => void
}>({
  items: [],
  totalAmount: 0,
  addItem() {
  },
  removeItem() {
  }
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: Props) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0
  });

  function handleAddItem(item: Meal) {
    dispatch({
      type: 'ADD',
      item
    });
  }

  function handleRemoveItem(id: string) {
    dispatch({
      type: 'REMOVE',
      id
    });
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: handleAddItem,
        removeItem: handleRemoveItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function cartReducer(
  state: CartState,
  action: {
    type: 'ADD' | 'REMOVE',
    id?: string,
    item?: Meal
  }
): CartState {
  switch (action.type) {
    case 'ADD': {
      const oldItem = state.items.find(item => item.id === action.item!.id);
      if (oldItem) {
        oldItem.quantity += action.item!.quantity;
        const newTotalAmount = state.totalAmount + action.item!.quantity * action.item!.price;

        return {
          items: [...state.items],
          totalAmount: +newTotalAmount.toFixed(2)
        };
      }

      const newItems = state.items.concat(action.item!);
      const newTotalAmount = state.totalAmount + action.item!.quantity * action.item!.price;

      return {
        items: newItems,
        totalAmount: +newTotalAmount.toFixed(2)
      };
    }
    case 'REMOVE': {
      const deletedItem = state.items.find(item => item.id === action.id);
      if (!deletedItem) {
        throw Error('Can not found meal');
      }

      const newItems = state.items.filter(item => item.id !== action.id);
      const newTotalAmount = state.totalAmount - (deletedItem.quantity * deletedItem.price);

      return {
        items: newItems,
        totalAmount: newTotalAmount
      };
    }
  }
  throw Error(`Unknown action: ${action.type}`);
}

interface CartState {
  items: Meal[],
  totalAmount: number
}

interface Props {
  children: ReactNode;
}

interface Meal {
  id: string,
  name: string,
  description: string,
  price: number,
  quantity: number
}
