import styles from './MealItemForm.module.scss';
import Input, { InputRef } from '../shared/input/Input';
import { useRef } from 'react';

export default function MealItemForm(
  { onAddClick }: {
    onAddClick: (quantity: number) => void
  }
) {
  const inputRef = useRef<InputRef>(null);

  return (
    <div className={styles.form}>
      <Input
        label="Amount"
        input={{
          type: 'number',
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1
        }}
        ref={inputRef}
      />
      <div>
        <button
          className={styles.badge}
          onClick={() => onAddClick(inputRef.current!.getQuantity())}
        >+
          Add
        </button>
      </div>
    </div>
  );
}
