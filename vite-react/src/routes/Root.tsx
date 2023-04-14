import classes from './AdminLayout.module.scss';
import {Alert, Breadcrumb, Button, Layout, Menu, Space, theme, Typography} from 'antd';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import Copyright from '../components/copyright/Copyright';
import {ReactNode, useEffect, useMemo, useState} from 'react';
import {LoginOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../store-hooks';
import {logout, reLoginFromCache} from '../features/auth/auth-slice';
import {MenuItem, PAGES, useAuthorizedMenus} from '../App';

export default function Root() {
  useReLogin();

  const {pathname} = useLocation();
  const isHomeLocation = pathname === '/';

  const menus = useAuthorizedMenus();
  const paths = usePathSnippets(menus);

  const error = useAppSelector(state => state.layout.error);

  return (
    <Layout>
      <HeaderLayout/>

      <Layout style={{minHeight: 'calc(100vh - 64px)'}}>
        {!isHomeLocation && <SidebarMenus
          menus={menus}
          paths={paths}
        />}

        <Layout style={{padding: '0 2.4rem 2.4rem'}}>
          {!isHomeLocation && <Breadcrumbs paths={paths}/>}

          <ContentLayout>
            <Space
              direction="vertical"
              style={{width: '100%'}}
            >
              {error && <Alert
                type="error"
                message={error}
                showIcon
                closable
              />}
              <Outlet/>
            </Space>
          </ContentLayout>

          <FooterLayout/>
        </Layout>
      </Layout>
    </Layout>
  );
}

function useReLogin() {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(
        reLoginFromCache(
          () => {
            if (pathname === '/login') {
              navigate('/', {replace: true});
              return;
            }

            navigate(pathname, {replace: true});
          }
        )
      );
    },
    []
  );
}

export function FooterLayout() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      <Copyright/>
    </Layout.Footer>
  );
}

function ContentLayout({children}: { children: ReactNode }) {
  const {token: {colorBgContainer}} = theme.useToken();

  const contentStyles = {
    padding: '2.4rem',
    margin: 0,
    minHeight: '28rem',
    background: colorBgContainer
  };

  return (
    <Layout.Content style={contentStyles}>
      {children}
    </Layout.Content>
  );
}

function Breadcrumbs({paths}: {
  paths: { url: string, title: string }[]
}) {
  const breadcrumbItems = useMemo(
    () => {
      const extraBreadcrumbItems = paths.map(({url, title}) => {
        return {
          key: url,
          title: <Link to={url}>{title}</Link>
        };
      });

      return [
        {
          key: '/',
          title: <Link to="/">首页</Link>
        }
      ].concat(extraBreadcrumbItems);
    },
    [JSON.stringify(paths)]
  );

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{margin: '1.6rem 0'}}
    />
  );
}

function SidebarMenus({menus, paths}: {
  menus: MenuItem[],
  paths: { url: string, title: string }[]
}) {
  const menuItems = useMenus(menus);
  const selectedKeys = useMenuSelectedKeys(menus, paths);

  const [openKeys, setOpenKeys] = useState(selectedKeys);

  useEffect(
    () => {
      setOpenKeys(prevKeys => {
        if (prevKeys.length === 0) {
          return [...selectedKeys];
        }

        return prevKeys;
      });
    },
    [JSON.stringify(selectedKeys)]
  );

  function handleOpenChange(keys: string[]) {
    setOpenKeys([...keys]);
  }

  return (
    <Layout.Sider>
      <Menu
        mode="inline"
        style={{height: '100%', borderRight: 0}}
        items={menuItems}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      />
    </Layout.Sider>
  );
}

function HeaderLayout() {
  const menuItems = PAGES.map(page => {
    return {
      key: page.url,
      label: (
        <a href={page.url}>{page.title}</a>
      )
    };
  });

  menuItems.unshift({key: '/counter', label: <Link to="/counter">计数器（受保护页）</Link>});

  return (
    <Layout.Header style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Link
        to="/"
        style={{display: 'flex', alignItems: 'center'}}
      >
        <img
          src="/vite.svg"
          alt="Vite logo"
        />
        <Typography.Title
          level={2}
          style={{color: 'white', marginBottom: 0}}
        >
          Vite + React + TS
        </Typography.Title>
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={menuItems}
      />

      <AuthButton/>
    </Layout.Header>
  );
}

function AuthButton() {
  const username = useAppSelector(state => state.auth.username);
  const nickname = useAppSelector(state => state.auth.nickname);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={classes.auth}>
      {
        username &&
        <Typography.Text
          strong
          style={{color: 'white', fontSize: '1.6rem'}}
        >
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

function usePathSnippets(menus: MenuItem[]) {
  const {pathname} = useLocation();

  return useMemo(
    () => {
      const pathSnippets = pathname.split('/').filter((p) => p);

      return pathSnippets.map((path, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = getTitle(menus, url) ?? path;

        return {url, title};
      });

      function getTitle(items: MenuItem[], urlToSearch: string): string | null {
        for (const item of items) {
          if (item.url && item.url === urlToSearch) {
            return item.title;
          }

          if (!item.url && item.children) {
            return getTitle(item.children, urlToSearch);
          }
        }

        return null;
      }
    },
    [pathname, JSON.stringify(menus)]
  );
}

function useMenus(menus: MenuItem[]) {
  return useMemo(
    () => {
      return menus.map(route => {
        if (route.url) {
          return {
            key: route.url,
            icon: route.icon,
            label: <Link to={route.url}>{route.title}</Link>
          };
        }

        const children = route.children?.map(child => {
          return {
            key: child.url,
            label: <Link to={child.url!}>{child.title}</Link>
          };
        });

        if (children) {
          return {
            key: route.title,
            icon: route.icon,
            label: route.title,
            children
          };
        }

        return {
          key: route.title,
          icon: route.icon,
          label: route.title
        };
      });
    },
    [JSON.stringify(menus)]
  );
}

function useMenuSelectedKeys(
  menus: MenuItem[],
  paths: { url: string, title: string }[]
) {
  const pathEnd = paths.at(paths.length - 1);

  return useMemo(
    () => {
      return getSelectedKeys(menus);

      function getSelectedKeys(items: MenuItem[]) {
        const keys = [] as string[];

        for (const item of items) {
          if (item.url && pathEnd?.url === item.url) {
            keys.push(item.url);
            continue;
          }

          if (!item.url && item.children) {
            const childKeys = getSelectedKeys(item.children);

            if (childKeys.length > 0) {
              keys.push(item.title, ...childKeys);
            }
          }
        }

        return keys;
      }
    },
    [JSON.stringify(menus), pathEnd]
  );
}
