import styles from './Input.module.scss';
import { InputHTMLAttributes } from 'react';

export default function Input({ label, input }: Props) {
  return (
    <label className={styles.label}>
      <span>{label + ' '}</span>
      <input {...input}/>
    </label>
  );
};

interface Props {
  label: string,
  input: InputHTMLAttributes<HTMLInputElement>
}
