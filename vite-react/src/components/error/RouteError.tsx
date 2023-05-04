import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';

interface Props {
  code?: number;
  message?: string;
}

const COUNTDOWN_SECONDS = 10;

export default function RouteError({ code = 404, message = '糟糕！未找到您要访问的页面 :(' }: Props) {
  const { goToHome, countdown } = useRedirect();

  return (
    <Space
      direction="vertical"
      style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography.Title
        type="warning"
        style={{ marginBottom: '1rem', fontSize: '10rem' }}
      >
        {code}
      </Typography.Title>

      <Typography.Title
        level={2}
        style={{ marginTop: '1rem', fontSize: '3rem' }}
      >
        {message}
      </Typography.Title>

      <Space>
        <Typography.Text>
          您将在 <Typography.Text code>{countdown}</Typography.Text> 秒后回到首页，或点击立即回到
        </Typography.Text>
        <Button type="primary" onClick={goToHome}>首页</Button>
      </Space>
    </Space>
  );
}

function useRedirect() {
  const navigate = useNavigate();

  const goToHome = React.useCallback(
    () => navigate('/', { replace: true }),
    []
  );

  const [countdown, setCountdown] = React.useState(COUNTDOWN_SECONDS);

  React.useEffect(
    () => {
      const interval = window.setInterval(
        () => setCountdown(prevCountdown => prevCountdown - 1),
        1000
      );

      const timeout = window.setTimeout(goToHome, COUNTDOWN_SECONDS * 1000);

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
      };
    },
    []
  );

  return { goToHome, countdown };
}
