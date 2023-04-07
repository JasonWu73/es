import {Breadcrumb, Layout, Menu, theme, Typography} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {PAGES, sidebarMenuRoutes} from './Root';
import Copyright from '../shared/components/copyright/Copyright';

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

      <Layout>
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

function usePathSnippets() {
  const location = useLocation();
  return location.pathname.split('/').filter((p) => p);
}

function Breadcrumbs() {
  const pathSnippets = usePathSnippets();

  const extraBreadcrumbItems = pathSnippets.map((path, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = sidebarMenuRoutes.find(menu => menu.url === url)?.title ?? path;

    return {
      key: url,
      title: <Link to={url}>{title}</Link>,
    };
  });

  const breadcrumbItems = [
    {
      key: '/',
      title: <Link to="/">首页</Link>
    },
  ].concat(extraBreadcrumbItems);

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{margin: '1.6rem 0'}}
    />
  );
}

function SidebarMenus() {
  const menuItems = sidebarMenuRoutes.map(route => {
    return {
      key: route.url,
      icon: route.icon,
      label: <Link to={route.url}>{route.title}</Link>
    };
  });

  const pathSnippets = usePathSnippets();

  const selectedKeys = menuItems
    .filter(menu => pathSnippets.find(path => `/${path}` === menu.key))
    .map(menu => menu.key);

  return (
    <Layout.Sider>
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={menuItems}
      />
    </Layout.Sider>
  );
}

function HeaderLayout() {
  const items = PAGES.map(page => {
    return {
      key: page.url,
      label: (
        <a href={page.url}>{page.title}</a>
      )
    };
  });

  return (
    <Layout.Header style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
        <img src="/vite.svg" alt="Vite logo"/>
        <Typography.Title level={2} style={{color: 'white', marginBottom: 0}}>多页面应用 Demo</Typography.Title>
      </Link>

      <Menu theme="dark" mode="horizontal" items={items}/>
    </Layout.Header>
  );
}

function FooterLayout() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      <Copyright/>
    </Layout.Footer>
  );
}
