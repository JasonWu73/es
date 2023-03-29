import React from 'react';
import classes from './Button.module.scss';

export default function Button({ children, onClick }: {
  children: React.ReactNode,
  onClick?: () => void
}) {
  return (
    <button
      className={classes.btn}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
