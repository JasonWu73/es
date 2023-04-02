import classes from './Counter.module.scss';
import { useCounter } from '../../hooks/use-counter';

export default function ForwardCounter() {
  const counter = useCounter();

  return (
    <div className={classes.counter}>
      <h2>{counter}</h2>
    </div>
  );
}
