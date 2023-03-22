import styles from './Input.module.scss';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';

export interface InputRef {
  focus: () => void;
}

const Input = forwardRef(function Input(
  { label, type, isInvalid, value, onChange, onBlur }: Props,
  ref: ForwardedRef<InputRef>
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current!.focus();
      }
    };
  });

  return (
    <label>
      {label}
      <input
        ref={inputRef}
        type={type}
        className={isInvalid ? styles.error : ''}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
      />
    </label>
  );
});

export default Input;

interface Props {
  label: string,
  type: string,
  isInvalid: boolean,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void
}
