import classes from './Login.module.scss';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import {Button, Form, Input, Layout, Typography} from 'antd';
import {FooterLayout} from '../AdminLayout';
import bg from '../../shared/assets/img/ant-design-pro-background.svg';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

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

  function handleFinish() {
    console.log('login data');
  }

  function handleFinishFailed() {
    console.log('login failed');
  }

  return (
    <Form
      name="login"
      className={classes.form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{required: true, message: '请输入用户名！'}]}
      >
        <Input size="large" prefix={<UserOutlined/>} placeholder="用户名：admin"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{required: true, message: '请输入密码！'}]}
      >
        <Input.Password size="large" prefix={<LockOutlined/>} placeholder="密码：123"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" style={{width: '100%'}}>
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
}
