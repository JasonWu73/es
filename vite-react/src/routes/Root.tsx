import {Alert, Breadcrumb, Button, Layout, Menu, Space, theme, Typography} from 'antd';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import Copyright from '../components/copyright/Copyright';
import {ReactNode, useEffect, useMemo, useState} from 'react';
import {LoginOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../store-hooks';
import {logout, reLoginFromCache} from './auth/auth-slice';
import {MenuItem, PAGES, useAuthorizedMenus} from '../App';

export default function Root() {
  useReLogin();
  const {pathname} = useLocation();
  const authorizedMenus = useAuthorizedMenus();
  const pathSnippets = usePathSnippets(authorizedMenus);
  const error = useAppSelector(state => state.layout.error);

  const isHomePage = pathname === '/';

  return (
    <Layout>
      <HeaderLayout/>

      <Layout style={{minHeight: 'calc(100vh - 64px)'}}>
        {!isHomePage && <SidebarMenu menus={authorizedMenus} paths={pathSnippets}/>}

        <Layout style={{padding: '0 2.4rem 2.4rem'}}>
          {!isHomePage && <Breadcrumbs paths={pathSnippets}/>}

          <ContentLayout>
            <Space direction="vertical" style={{width: '100%'}}>
              {error && <Alert type="error" message={error} showIcon closable/>}

              <Outlet/>
            </Space>
          </ContentLayout>

          <FooterLayout/>
        </Layout>
      </Layout>
    </Layout>
  );
}

export function HeaderLayout() {
  const topBarMenus = PAGES.map(page => {
    return {
      key: page.url,
      label: <a href={page.url}>{page.title}</a>
    };
  });

  topBarMenus.unshift({
    key: '/counter',
    label: <Link to="/counter">计数器</Link>
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

export function FooterLayout() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      <Copyright/>
    </Layout.Footer>
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

interface PathSnippet {
  url: string;
  title: string;
}

function usePathSnippets(authorizedMenus: MenuItem[]): PathSnippet[] {
  const {pathname} = useLocation();

  return useMemo(
    () => {
      const pathSnippets = pathname.split('/').filter((p) => p);

      return pathSnippets.map((path, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = getMenuTitle(authorizedMenus, url) ?? path;

        return {url, title};
      });

      function getMenuTitle(items: MenuItem[], urlToSearch: string): string | null {
        for (const item of items) {
          if (item.url === urlToSearch) {
            return item.title;
          }

          if (item.children) {
            return getMenuTitle(item.children, urlToSearch);
          }
        }

        return null;
      }
    },
    [JSON.stringify(authorizedMenus), pathname]
  );
}

function AuthButton() {
  const username = useAppSelector(state => state.auth.username);
  const nickname = useAppSelector(state => state.auth.nickname);
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
        <Button type="primary" icon={<PoweroffOutlined/>} onClick={() => dispatch(logout())}>
          注销
        </Button>
      }

      {
        !username &&
        <Button type="primary" icon={<LoginOutlined/>} onClick={() => navigate('/login')}>
          登录
        </Button>
      }
    </div>
  );
}

function SidebarMenu({menus, paths}: { menus: MenuItem[], paths: PathSnippet[] }) {
  const menuItems = useAntMenus(menus);
  const selectedKeys = useMenuSelectedKeys(menus, paths);
  const {openKeys, setOpenKeys} = useOpenKeys(selectedKeys);

  return (
    <Layout.Sider>
      <Menu
        mode="inline"
        style={{height: '100%', borderRight: 0}}
        items={menuItems}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys([...keys])}
      />
    </Layout.Sider>
  );
}

function useAntMenus(menus: MenuItem[]) {
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

        if (route.children && route.children.length > 0) {
          const submenus = route.children.map(submenu => {
            return {
              key: submenu.url,
              label: <Link to={submenu.url!}>{submenu.title}</Link>
            };
          });

          return {
            key: route.title,
            icon: route.icon,
            label: route.title,
            children: submenus
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

function useMenuSelectedKeys(menus: MenuItem[], paths: PathSnippet[]) {
  const pathEnd = paths.at(paths.length - 1);

  return useMemo(
    () => {
      return getSelectedKeys(menus);

      function getSelectedKeys(menus: MenuItem[]) {
        const selectedKeys: string[] = [];

        for (const menu of menus) {
          if (menu.url && menu.url === pathEnd?.url) {
            selectedKeys.push(menu.url);
            continue;
          }

          if (menu.children && menu.children.length > 0) {
            const submenuSelectedKeys = getSelectedKeys(menu.children);

            if (submenuSelectedKeys.length > 0) {
              selectedKeys.push(menu.title, ...submenuSelectedKeys);
            }
          }
        }

        return selectedKeys;
      }
    },
    [JSON.stringify(menus), pathEnd]
  );
}

function useOpenKeys(selectedKeys: string[]) {
  const [openKeys, setOpenKeys] = useState(selectedKeys);

  useEffect(
    () => {
      setOpenKeys(prevKeys => {
        if (prevKeys.length < selectedKeys.length) {
          return [...selectedKeys];
        }

        return prevKeys;
      });
    },
    [JSON.stringify(selectedKeys)]
  );

  return {openKeys, setOpenKeys};
}

function Breadcrumbs({paths}: { paths: PathSnippet[] }) {
  const breadcrumbItems = useBreadcrumbItems(paths);

  return (
    <Breadcrumb items={breadcrumbItems} style={{margin: '1.6rem 0'}}/>
  );
}

function useBreadcrumbItems(paths: PathSnippet[]) {
  return useMemo(
    () => {
      const prevBreadcrumbItems = paths.map(({url, title}) => {
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
      ].concat(prevBreadcrumbItems);
    },
    [JSON.stringify(paths)]
  );
}

function ContentLayout({children}: { children: ReactNode }) {
  const {token: {colorBgContainer}} = theme.useToken();

  return (
    <Layout.Content
      style={{
        padding: '2.4rem',
        margin: 0,
        minHeight: '28rem',
        background: colorBgContainer
      }}
    >
      {children}
    </Layout.Content>
  );
}
