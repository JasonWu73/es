import {Breadcrumb, Layout, Menu, theme, Typography} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {PAGES, sidebarMenuRoutes} from './Root';
import Copyright from '../shared/components/copyright/Copyright';

export default function AdminLayout() {
  const {token: {colorBgContainer}} = theme.useToken();

  const breadcrumbItems = [{title: 'Home'}, {title: 'List'}, {title: 'App'}];

  return (
    <Layout>
      <HeaderLayout/>

      <Layout>
        <SidebarMenus/>

        <Layout style={{padding: '0 2.4rem 2.4rem'}}>
          <Breadcrumb items={breadcrumbItems} style={{margin: '1.6rem 0'}}/>

          <Layout.Content
            style={
              {
                padding: '2.4rem',
                margin: 0,
                minHeight: '28rem',
                background: colorBgContainer
              }
            }
          >
            <Outlet/>
          </Layout.Content>

          <FooterLayout/>
        </Layout>
      </Layout>
    </Layout>
  );
}

function SidebarMenus() {
  const menus = sidebarMenuRoutes.map(route => {
    return {
      key: route.url,
      icon: route.icon,
      label: <Link to={route.url}>{route.title}</Link>
    };
  });

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((p) => p);

  const selectedKeys = menus
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
        items={menus}
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
