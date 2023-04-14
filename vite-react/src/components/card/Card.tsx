import classes from './Card.module.scss';
import {CSSProperties, ReactNode} from "react";

export default function Card({children, style}: {
  children: ReactNode;
  style: CSSProperties
}) {
  return (
    <div
      style={style}
      className={classes.card}
    >
      {children}
    </div>
  );
}
