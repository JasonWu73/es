import styles from './MealItemForm.module.scss';
import Input, { InputRef } from '../shared/input/Input';
import { FormEvent, useRef } from 'react';

export default function MealItemForm(
  { onAdd }: {
    onAdd: (quantity: number) => void
  }
) {
  const inputRef = useRef<InputRef>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onAdd(inputRef.current!.getQuantity());
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
        <button type="submit" className={styles.badge}>+ Add</button>
      </div>
    </form>
  );
}
