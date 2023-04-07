import {Breadcrumb, Button, Layout, Menu, theme, Typography} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {PAGES, sidebarMenuRoutes} from './Root';
import Copyright from '../shared/components/copyright/Copyright';
import {ReactNode, useMemo, useState} from 'react';
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../store-hooks';
import {logout} from './auth/auth-slice';

export default function AdminLayout() {
  const {token: {colorBgContainer}} = theme.useToken();

  const contentStyles = {
    padding: '2.4rem',
    margin: 0,
    minHeight: '28rem',
    background: colorBgContainer
  };

  const location = useLocation();
  const isHomeLocation = location.pathname === '/';

  return (
    <Layout>
      <HeaderLayout/>

      <Layout style={{minHeight: 'calc(100vh - 64px)'}}>
        {!isHomeLocation && <SidebarMenus/>}

        <Layout style={{padding: '0 2.4rem 2.4rem'}}>
          {!isHomeLocation && <Breadcrumbs/>}

          <Layout.Content style={contentStyles}>
            <Outlet/>
          </Layout.Content>

          <FooterLayout/>
        </Layout>
      </Layout>
    </Layout>
  );
}

function Breadcrumbs() {
  const pathSnippetInfos = usePathSnippetInfos();

  const breadcrumbItems = useMemo(
    () => {
      const extraBreadcrumbItems = pathSnippetInfos.map(({url, title}) => {
        return {
          key: url,
          title: <Link to={url}>{title}</Link>,
        };
      });

      return [
        {
          key: '/',
          title: <Link to="/">首页</Link>
        },
      ].concat(extraBreadcrumbItems);
    },
    [pathSnippetInfos]
  );

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{margin: '1.6rem 0'}}
    />
  );
}

function SidebarMenus() {
  const menuItems = sidebarMenuRoutes.map(route => {
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
        label: <Link to={child.url}>{child.title}</Link>
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

  const pathSnippetInfos = usePathSnippetInfos();

  const selectedKeys = useMemo(
    () => {
      return getSelectedKeys(sidebarMenuRoutes);

      function getSelectedKeys(items: {
        title: string,
        url?: string,
        icon?: ReactNode,
        children?: { title: string, url: string }[]
      }[]) {
        const keys = [] as string[];

        for (const item of items) {
          if (item.url && pathSnippetInfos.find(({url}) => url === item.url)) {
            keys.push(item.url);
          } else if (!item.url && item.children) {
            const childKeys = getSelectedKeys(item.children);
            if (childKeys) {
              keys.push(item.title, ...childKeys);
            }
          }
        }

        return keys;
      }
    },
    [pathSnippetInfos]
  );

  return (
    <Layout.Sider>
      <Menu
        mode="inline"
        style={{height: '100%', borderRight: 0}}
        items={menuItems}
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
      />
    </Layout.Sider>
  );
}

function usePathSnippetInfos() {
  const {pathname} = useLocation();

  return useMemo(
    () => {
      const pathSnippets = pathname.split('/').filter((p) => p);

      return pathSnippets.map((path, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = getTitle(sidebarMenuRoutes, url) ?? path;

        return {url, title}
      });

      function getTitle(
        items: {
          title: string,
          url?: string,
          icon?: ReactNode,
          children?: { title: string, url: string }[]
        }[],
        urlToSearch: string
      ): string | null {
        for (const item of items) {
          if (item.url && item.url === urlToSearch) {
            return item.title;
          } else if (!item.url && item.children) {
            return getTitle(item.children, urlToSearch);
          }
        }

        return null;
      }
    },
    [pathname]
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

  menuItems.unshift({key: '/counter', label: <Link to="/counter">计数器 (受保护页)</Link>});

  return (
    <Layout.Header style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
        <img src="/vite.svg" alt="Vite logo"/>
        <Typography.Title level={2} style={{color: 'white', marginBottom: 0}}>多页面应用 Demo</Typography.Title>
      </Link>

      <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems}/>
      <LogoutButton/>
    </Layout.Header>
  );
}

function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const {username} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  function handleLogout() {
    setLoading(true);
    dispatch(logout(() => setLoading(false)));
  }

  if (!username) {
    return <></>;
  }

  return (
    <div style={{marginLeft: 'auto', order: 2, display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Typography.Text strong style={{color: 'white', fontSize: '1.6rem'}}>
        <UserOutlined/> {username}
      </Typography.Text>
      <Button
        type="primary"
        icon={<PoweroffOutlined/>}
        loading={loading}
        onClick={handleLogout}
      >
        注销
      </Button>
    </div>
  );
}

function FooterLayout() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      <Copyright/>
    </Layout.Footer>
  );
}
