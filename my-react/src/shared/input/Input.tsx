import styles from './Input.module.scss';
import { ChangeEvent } from 'react';

export default function Input(
  { label, type, isInvalid, value, onChange, onBlur }: Props
) {
  return (
    <label>
      {label}
      <input
        type={type}
        className={isInvalid ? styles.error : ''}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
      />
    </label>
  );
};

interface Props {
  label: string,
  type: string,
  isInvalid: boolean,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void
}
