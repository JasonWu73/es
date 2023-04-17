import classes from './Button.module.scss';
import {ReactNode} from 'react';

export default function Button(
  {
    onClick,
    type = 'submit',
    children,
    disabled
  }: {
    children: ReactNode;
    type?: 'submit' | 'button';
    onClick?: () => void;
    disabled?: boolean;
  }
) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes.button}
    >
      {children}
    </button>
  );
}
