import styles from './MealItemForm.module.scss';
import Input from '../shared/input/Input';

export default function MealItemForm() {
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
      />
      <div>
        <button className={styles.badge}>+ Add</button>
      </div>
    </div>
  );
}
