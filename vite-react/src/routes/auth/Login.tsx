import classes from './Login.module.scss';
import {usePageTitle} from '../../hooks/use-page-title';
import {Alert, Button, Form, Input, Layout, Typography} from 'antd';
import {FooterLayout} from '../AdminLayout';
import bg from '../../assets/img/ant-design-pro-background.svg';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch} from '../../store-hooks';
import {login} from './auth-slice';
import {useLocation, useNavigate} from 'react-router-dom';
import {useHttp} from '../../hooks/use-http';
import {getAccessTokenApi} from './auth-api';
import {useState} from 'react';

export default function Login() {
  usePageTitle('登录');

  return (
    <Layout
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 11rem',
        backgroundSize: '100%'
      }}
    >
      <Layout.Content>
        <div className={classes.login}>
          <div className={classes.login__logo}>
            <img src="/vite.svg" alt="Vite logo"/>
            <Typography.Title level={2} style={{marginBottom: 0}}>
              Vite + React + TS
            </Typography.Title>
          </div>

          <LoginForm/>
        </div>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}

function LoginForm() {
  const {loading, error, sendRequest} = useHttp();
  const [fakeError, setFakeError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  function handleLoginSubmit(formData: { username: string, password: string }) {
    setFakeError('');

    const username = formData.username.trim();
    const password = formData.password.trim();

    sendRequest(
      getAccessTokenApi({
        username: isValidUsername(username) ? 'kminchelle' : username,
        password: isValidPassword(password) ? '0lelplR' : password

      }),
      data => {
        applyAuth(data, username);
      }
    );
  }

  function applyAuth(data: { token: string }, username: string) {
    const {token: accessToken} = data;

    const expiresInSeconds = 30;
    const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
    const expiredAt = currentTimestampSeconds + expiresInSeconds;

    const userId = username === 'admin' ? 1 : 2;
    const authorities = username === 'admin' ? ['counter', 'post'] : ['post'];
    const nickname = username === 'admin' ? '测试管理员' : '测试用户';

    const authData = {
      userId,
      username,
      expiredAt,
      accessToken,
      refreshToken: accessToken,
      authorities,
      nickname
    };

    dispatch(login(authData));
    navigate(from, {replace: true});
  }

  return (
    <Form
      name="login"
      style={{width: '32.8rem', margin: '0 auto'}}
      onFinish={handleLoginSubmit}
      autoComplete="off"
    >
      {
        (error || fakeError) &&
        <Form.Item>
          <Alert type="error" message={error || fakeError} showIcon closable/>
        </Form.Item>
      }

      <Form.Item name="username" rules={[{required: true, whitespace: true, message: '用户名不能为空'}]}>
        <Input size="large" prefix={<UserOutlined/>} placeholder={'用户名：admin 或 user'}/>
      </Form.Item>

      <Form.Item name="password" rules={[{required: true, whitespace: true, message: '密码不能为空'}]}>
        <Input.Password size="large" prefix={<LockOutlined/>} placeholder={'密码：123'}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" loading={loading} htmlType="submit" size="large" style={{width: '100%'}}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

function isValidUsername(username: string) {
  return username === 'admin' || username === 'user';
}

function isValidPassword(password: string) {
  return password === '123';
}
