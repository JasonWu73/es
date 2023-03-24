import classes from './Button.module.scss';
import React from 'react';

const Button = React.memo(function Button({ onClick, children }: ButtonProps) {
  console.log('Button RUNNING');
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
});

export default Button;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
