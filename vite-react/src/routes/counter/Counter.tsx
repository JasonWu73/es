import classes from './Counter.module.scss';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import reduxLogo from '../../shared/assets/img/redux-logo.svg';
import {ReactNode, useState} from 'react';
import {Button, Card, Divider, InputNumber, Layout, List, Space, Typography} from 'antd';
import {useAppDispatch, useAppSelector} from '../../multipages/counter/store-hooks';
import {decrement, increment, incrementAsync, incrementByAmount} from './counter-slice';
import Copyright from '../../shared/components/copyright/Copyright';
import {Link} from 'react-router-dom';

const PAGES = [
  {
    title: 'React Redux',
    url: 'counter/index.html',
    description: '单独测试 React Redux'
  },
  {
    title: 'React Router',
    url: 'post/index.html',
    description: '单独测试 React Router'
  }
];

export default function Counter() {
  usePageTitle('Redux Counter');

  const [incrementAmount, setIncrementAmount] = useState(2);

  const counter = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  function handleIncrementAmountChange(value: number | null) {
    setIncrementAmount(value ?? 0);
  }

  return (
    <HomeLayout>
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
    </HomeLayout>
  );
}

function MultiplePages() {
  return (
    <>
      <Card style={{maxWidth: '60rem', margin: '2rem auto'}}>
        <Divider orientation="left">多页面链接</Divider>
        <List
          itemLayout="horizontal"
          dataSource={PAGES}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.url}>{index + 1} - {item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}

function HomeLayout({children}: { children: ReactNode }) {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Header style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/">
          <Typography.Title level={2} style={{color: 'white', marginBottom: 0}}>多页面应用 Demo</Typography.Title>
        </Link>
      </Layout.Header>

      <Layout.Content>
        <MultiplePages/>

        <div className={classes.counter}>
          <div className={classes.counter__header}>
            <img src={reduxLogo} className={classes.logo} alt="Redux logo"/>
            {children}
          </div>
        </div>
      </Layout.Content>

      <Layout.Footer style={{textAlign: 'center'}}>
        <Copyright/>
      </Layout.Footer>
    </Layout>
  );
}
