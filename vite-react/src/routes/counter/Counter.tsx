import classes from './Counter.module.scss';
import {usePageTitle} from '../../hooks/use-page-title';
import {useState} from 'react';
import {Button, InputNumber, Space, Typography} from 'antd';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {decrement, increment, incrementAsync, incrementByAmount} from './counter-slice';
import reduxLogo from '../../assets/img/redux-logo.svg';

export default function Counter() {
  usePageTitle('计数器');

  const [incrementAmount, setIncrementAmount] = useState(2);

  const counter = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  function handleIncrementAmountChange(value: number | null) {
    setIncrementAmount(value ?? 0);
  }

  return (
    <div className={classes.counter}>
      <div className={classes.counter__header}>
        <img src={reduxLogo} className={classes.counter__header__logo} alt="Redux logo"/>
        <Space direction="vertical">
          <Space>
            <Button type="default" shape="circle" size="large" onClick={() => dispatch(increment())}>+</Button>
            <Typography.Text style={{fontSize: '4.8rem'}}>{counter.value}</Typography.Text>
            <Button type="default" shape="circle" size="large" onClick={() => dispatch(decrement())}>-</Button>
          </Space>

          <Space>
            <InputNumber size="large" defaultValue={incrementAmount} onChange={handleIncrementAmountChange}/>
            <Button
              type="default"
              size="large"
              onClick={() => dispatch(incrementByAmount(incrementAmount))}
            >
              增量添加
            </Button>
            <Button type="default" size="large" onClick={() => dispatch(incrementAsync(incrementAmount))}>
              <Typography.Text type="danger" style={{fontSize: 'inherit'}}>异步</Typography.Text>增量添加
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
}
