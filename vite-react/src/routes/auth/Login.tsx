import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import { Alert, Button, Form, Input, Layout, Space, Typography } from 'antd';
import bg from '../../assets/img/ant-design-pro-background.svg';
import { useAppDispatch, useAppSelector } from '@/store-hooks';
import { getAccessTokenRequest } from './auth-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterLayout from '../../components/layout/FooterLayout';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/all';

export default function Login() {
  usePageTitle('登录');
  useAutoRedirect();

  return (
    <Layout
      style={{
        minHeight: '100dvh',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 11rem',
        backgroundSize: '100%'
      }}
    >
      <Layout.Content style={{ display: 'flex' }}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Space>
            <img src="/react.svg" alt="Vite logo" width={32} style={{ pointerEvents: 'none' }} />
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              Vite + React + TS
            </Typography.Title>
          </Space>

          <LoginForm />
        </Space>
      </Layout.Content>

      <FooterLayout />
    </Layout>
  );
}

function LoginForm() {
  const { loading, error } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  function handleLoginSubmit(values: { username: string, password: string }) {
    const username = values.username.trim();
    const password = values.password.trim();

    dispatch(getAccessTokenRequest(
      username,
      password,
      () => navigate(from, { replace: true })
    ));
  }

  return (
    <Form
      name="login"
      style={{ width: '32.8rem', margin: '0 auto' }}
      onFinish={handleLoginSubmit}
      autoComplete="off"
    >
      {
        error &&
        <Form.Item>
          <Alert type="error" message={error} showIcon closable />
        </Form.Item>
      }

      <Form.Item name="username" rules={[{ required: true, whitespace: true, message: '用户名不能为空' }]}>
        <Input size="large" prefix={<AiOutlineUser />} placeholder={'用户名：admin 或 user'} />
      </Form.Item>

      <Form.Item name="password" rules={[{ required: true, whitespace: true, message: '密码不能为空' }]}>
        <Input.Password size="large" prefix={<AiOutlineLock />} placeholder={'密码：123'} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" loading={loading} htmlType="submit" size="large" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

function useAutoRedirect() {
  const username = useAppSelector(state => state.auth.username);
  const navigate = useNavigate();

  React.useEffect(
    () => {
      if (!username) return;

      navigate('/', { replace: true });
    },
    []
  );
}
