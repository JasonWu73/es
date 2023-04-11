import classes from './NotFound.module.scss';
import {useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {usePageTitle} from '../../hooks/use-page-title';
import {Button, Space, Typography} from 'antd';

const COUNTDOWN_SECONDS = 10;

export default function NotFound() {
  usePageTitle('页面不存在');

  const {goToHome, countdown} = useRedirect();

  return (
    <div className={classes['not-found']}>
      <Typography.Title
        type="warning"
        style={{marginBottom: '1rem', fontSize: '18.6rem', textAlign: 'center'}}
      >
        404
      </Typography.Title>

      <Typography.Title
        level={2}
        style={{marginTop: '1rem', fontSize: '3.3rem'}}
      >
        糟糕！什么都没有找到 :(
      </Typography.Title>

      <Space>
        <Typography.Text>
          您将在 <Typography.Text code>{countdown}</Typography.Text> 秒后回到首页，或点击立即回到
        </Typography.Text>
        <Button type="primary" onClick={goToHome}>首页</Button>
      </Space>
    </div>
  );
}

function useRedirect() {
  const navigate = useNavigate();

  const goToHome = useCallback(
    () => {
      navigate('/', {replace: true});
    },
    []
  );

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCountdown(prevCountdown => prevCountdown - 1);
      },
      1000
    );

    const timeout = setTimeout(goToHome, COUNTDOWN_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return {goToHome, countdown};
}
