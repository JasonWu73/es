import classes from './Login.module.scss';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import {Alert, Button, Form, Input, Layout, Typography} from 'antd';
import {FooterLayout} from '../AdminLayout';
import bg from '../../shared/assets/img/ant-design-pro-background.svg';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch} from '../../store-hooks';
import {wait} from '../../shared/utils/promisify';
import {useState} from 'react';
import {login} from './auth-slice';
import {useLocation, useNavigate} from 'react-router-dom';

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
        <div className={classes.container}>
          <div className={classes.logo}>
            <img src="/vite.svg" alt="Vite logo"/>
            <Typography.Title level={2} style={{marginBottom: 0}}>登录表单</Typography.Title>
          </div>

          <LoginForm/>
        </div>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  async function handleFinish(values: { username: string, password: string }) {
    setLoading(true);
    setError('');

    await wait(1);
    setLoading(false);

    const {username, password} = values;

    const authData = getAuthData(username, password);

    if (!authData) {
      setError('用户名或密码错误');
      return;
    }

    dispatch(login(authData!));

    navigate(from, {replace: true});
  }

  return (
    <Form
      name="login"
      className={classes.form}
      onFinish={handleFinish}
      autoComplete="off"
    >
      {
        error &&
        <Form.Item>
          <Alert type="error" message={error} showIcon/>
        </Form.Item>
      }

      <Form.Item
        name="username"
        rules={[{required: true, message: '请输入用户名！'}]}
      >
        <Input size="large" prefix={<UserOutlined/>} placeholder={'用户名：admin 或 user'}/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{required: true, message: '请输入密码！'}]}
      >
        <Input.Password size="large" prefix={<LockOutlined/>} placeholder={'密码：123'}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" loading={loading} htmlType="submit" size="large" style={{width: '100%'}}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
}

function getAuthData(username: string, password: string) {
  const usernameInvalid = username !== 'admin' && username !== 'user';
  const passwordInvalid = password !== '123';

  if (usernameInvalid || passwordInvalid) return null;

  const expiresInSeconds = 1800;
  const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
  const expiredAt = currentTimestampSeconds + expiresInSeconds;

  const authorities = username === 'admin' ? ['counter', 'post'] : ['post_view'];
  const nickname = username === 'admin' ? '测试管理员' : '测试用户';

  return {
    userId: 1,
    username,
    expiredAt,
    accessToken: '111.111',
    refreshToken: '222.222',
    authorities,
    nickname
  };
}
