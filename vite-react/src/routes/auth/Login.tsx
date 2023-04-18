import classes from './Login.module.scss';
import {usePageTitle} from '../../hooks/use-page-title';
import {Alert, Button, Form, Input, Layout, Typography} from 'antd';
import bg from '../../assets/img/ant-design-pro-background.svg';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {getAccessTokenRequest} from './auth-slice';
import {useLocation, useNavigate} from 'react-router-dom';
import FooterLayout from '../../components/layout/FooterLayout';

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
  const {loading, error} = useAppSelector(state => state.ui);
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
      () => navigate(from, {replace: true})
    ));
  }

  return (
    <Form
      name="login"
      style={{width: '32.8rem', margin: '0 auto'}}
      onFinish={handleLoginSubmit}
      autoComplete="off"
    >
      {
        error &&
        <Form.Item>
          <Alert type="error" message={error} showIcon closable/>
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
