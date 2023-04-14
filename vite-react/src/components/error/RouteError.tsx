import {useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {Button, Space, Typography} from 'antd';

const COUNTDOWN_SECONDS = 10;

export default function RouteError({code, message}: { code: number, message: string }) {
  const {goToHome, countdown} = useRedirect();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80rem'
      }}
    >
      <Typography.Title
        type="warning"
        style={{marginBottom: '1rem', fontSize: '18.6rem', textAlign: 'center'}}
      >
        {code}
      </Typography.Title>

      <Typography.Title
        level={2}
        style={{marginTop: '1rem', fontSize: '3.3rem'}}
      >
        {message}
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

  useEffect(
    () => {
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
    },
    []
  );

  return {goToHome, countdown};
}
