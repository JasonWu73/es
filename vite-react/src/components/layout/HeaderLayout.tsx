import {sendRequest} from '../../hooks/use-http';
import {mockHttpApi} from '../../routes/auth/auth-api';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Layout, Menu, Typography} from 'antd';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {LoginOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {logout} from '../../routes/auth/auth-slice';

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
    <Layout.Header style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
        <img src="/vite.svg" alt="Vite logo"/>
        <Typography.Title level={2} style={{color: 'white', marginBottom: 0}}>
          Vite + React + TS
        </Typography.Title>
      </Link>

      <Menu theme="dark" mode="horizontal" selectable={false} items={topBarMenus}/>

      <AuthButton/>
    </Layout.Header>
  );
}

function AuthButton() {
  const {username, nickname} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem'}}>
      {
        username &&
        <Typography.Text strong style={{color: 'white', fontSize: '1.6rem'}}>
          <UserOutlined/> {nickname || username}
        </Typography.Text>
      }

      {
        username &&
        <Button
          type="primary"
          icon={<PoweroffOutlined/>}
          onClick={() => dispatch(logout())}
        >
          注销
        </Button>
      }

      {
        !username &&
        <Button
          type="primary"
          icon={<LoginOutlined/>}
          onClick={() => navigate('/login')}
        >
          登录
        </Button>
      }
    </div>
  );
}
