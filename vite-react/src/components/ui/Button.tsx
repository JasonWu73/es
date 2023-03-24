import classes from './Button.module.scss';
import React from 'react';

export default function Button({ onClick, style, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${classes.btn} ${classes[style]}`}
    >
      {children}
    </button>
  );
}

interface ButtonProps {
  onClick: () => void;
  style: 'green' | 'blue' | 'red' | 'grey' | 'black';
  children: React.ReactNode;
}
