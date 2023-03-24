import classes from './Button.module.scss';
import React from 'react';

export default function Button({ style, children }: ButtonProps) {
  return (
    <button
      className={`${classes.btn} ${classes[style]}`}
    >
      {children}
    </button>
  );
}

interface ButtonProps {
  style: 'green' | 'blue' | 'red' | 'grey' | 'black';
  children: React.ReactNode;
}
