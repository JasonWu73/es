import styles from './Input.module.scss';
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef
} from 'react';

const Input = forwardRef(function Input(
  { label, input }: Props,
  ref: ForwardedRef<InputRef>
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      getQuantity() {
        return +inputRef.current!.value;
      }
    };
  });

  return (
    <label className={styles.label}>
      <span>{label + ' '}</span>
      <input {...input} ref={inputRef}/>
    </label>
  );
});

export default Input;

export interface InputRef {
  getQuantity: () => number;
}

interface Props {
  label: string,
  input: InputHTMLAttributes<HTMLInputElement>
}
