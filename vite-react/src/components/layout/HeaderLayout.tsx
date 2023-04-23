import { sendRequest } from '../../hooks/use-http';
import { mockHttpApi } from '../../routes/auth/auth-api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store-hooks';
import { logout } from '../../routes/auth/auth-slice';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from 'react-icons/all';
import React from 'react';

export const PAGES = [
  {
    title: 'Learning',
    url: '/learning/index.html',
    description: 'Learning never exhausts the mind.'
  }
];

export default function HeaderLayout() {
  const topBarMenus = PAGES.map(page => {
    return {
      key: page.url,
      label: <a href={page.url}>{page.title}</a>
    };
  });

  topBarMenus.unshift({
    key: '/counter',
    label: <a href="/counter">计数器</a>
  });

  topBarMenus.push({
    key: 'Unauthorized',
    label: <a onClick={() => sendRequest(mockHttpApi(401))}>
      响应 401
    </a>
  });

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <img src="/react.svg" alt="React logo" width={32} />
          <Typography.Title level={2} style={{ color: 'white', marginBottom: 0 }}>
            Vite + React + TS
          </Typography.Title>
        </Space>
      </Link>

      <Menu theme="dark" mode="horizontal" selectable={false} items={topBarMenus} />

      <AuthButton />
    </Layout.Header>
  );
}

function AuthButton() {
  const { username, nickname } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem'
  };

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {username && (
        <Typography.Text style={{ ...buttonStyles, color: 'white', fontSize: '1rem' }}>
          <AiOutlineUser />
          <span>{nickname || username}</span>
        </Typography.Text>
      )}

      {username && (
        <Button
          type="primary"
          icon={<AiOutlineLogout />}
          onClick={() => dispatch(logout())}
          style={buttonStyles}
        >
          注销
        </Button>
      )}

      {!username && (
        <Button
          type="primary"
          icon={<AiOutlineLogin />}
          onClick={() => navigate('/login')}
          style={buttonStyles}
        >
          登录
        </Button>
      )}
    </div>
  );
}
