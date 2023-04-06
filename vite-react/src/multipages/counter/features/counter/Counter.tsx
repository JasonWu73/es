import classes from './Counter.module.scss';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {decrement, increment, incrementAsync} from './counter-slice';
import Button from '../../../../shared/components/button/Button';

export default function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const counter = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div className={classes.counter}>
      <Button
        onClick={() => dispatch(incrementAsync(100))}
      >
        Increment Async 100
      </Button>
      <Button
        onClick={() => dispatch(increment())}
      >
        Increment
      </Button>
      <span>{counter.value}</span>
      <Button
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </Button>
    </div>
  );
}
