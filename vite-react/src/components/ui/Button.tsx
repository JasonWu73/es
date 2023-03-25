import classes from './Button.module.scss';
import React from 'react';

export default React.memo(Button);

function Button({ onClick, children }: ButtonProps) {
  console.log('Button RUNNING');
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
}

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
