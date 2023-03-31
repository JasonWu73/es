import classes from './Counter.module.scss';
import { useCounter } from '../../hooks/useCounter';

export default function BackwardCounter() {
  const counter = useCounter(false);

  return (
    <div className={classes.counter}>
      <h2>{counter}</h2>
    </div>
  );
}
