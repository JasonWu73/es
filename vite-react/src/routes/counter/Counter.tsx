import classes from './Counter.module.scss';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import reduxLogo from '../../shared/assets/img/redux-logo.svg';
import {ChangeEvent, ReactNode, useState} from 'react';
import {Button, InputNumber, Space, Typography} from 'antd';
import {useAppDispatch, useAppSelector} from '../../multipages/counter/store-hooks';
import {decrement, increment, incrementAsync, incrementByAmount} from './counter-slice';

export default function Counter() {
  usePageTitle('Redux Counter');

  const [incrementAmount, setIncrementAmount] = useState(2);

  const counter = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  function handleIncrementAmountChange(value: number | null) {
    setIncrementAmount(value ?? 0);
  }

  return (
    <Container>
      <Space direction="vertical">
        <Space size={'middle'}>
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
    </Container>
  );
}

function Container({children}: { children: ReactNode }) {
  return (
    <div className={classes.counter}>
      <div className={classes.counter__header}>
        <img src={reduxLogo} className={classes.logo} alt="Redux logo"/>
        {children}
      </div>
    </div>
  );
}
