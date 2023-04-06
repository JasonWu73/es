import classes from './Nav.module.scss';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode
}

export default function Nav({children}: Props) {
  return (
    <nav className={classes.nav}>
      {children}
    </nav>
  );
}
