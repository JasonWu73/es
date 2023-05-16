import {Alert, Breadcrumb, Layout, Menu, Space} from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {CSSProperties, useEffect, useMemo, useState} from 'react';
import {useAppSelector} from '@/store-hooks';
import {MenuItem, useAuthorizedMenus} from '@/App';
import FooterLayout from '../components/layout/FooterLayout';
import HeaderLayout from '../components/layout/HeaderLayout';
import {ContentLayout} from '@/components/layout/ContentLayout';

export default function AdminLayout() {
  const {pathname} = useLocation();
  const authorizedMenus = useAuthorizedMenus();
  const pathSnippets = usePathSnippets(authorizedMenus);
  const error = useAppSelector(state => state.ui.error);

  const isHomePage = pathname === '/';
  const ContentContainerStyle: CSSProperties = {
    paddingTop: isHomePage ? '2.4rem' : '',
    paddingRight: '2.4rem',
    paddingBottom: '2.4rem',
    paddingLeft: '2.4rem'
  };

  return (
    <Layout style={{minHeight: '100dvh'}}>
      <HeaderLayout/>

      <Layout>
        <SidebarMenu menus={authorizedMenus} paths={pathSnippets}/>

        <Layout style={ContentContainerStyle}>
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

interface PathSnippet {
  url: string;
  title: string;
}

function usePathSnippets(menus: MenuItem[]): PathSnippet[] {
  const {pathname} = useLocation();

  return useMemo(
    () => {
      if (pathname === '/') return [{url: '/', title: '首页'}];

      const pathSnippets = pathname.split('/').filter((p) => p);

      return pathSnippets.map((path, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const title = getMenuTitle(menus, url) ?? path;

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
    [menus, pathname]
  );
}

function SidebarMenu({menus, paths}: {menus: MenuItem[], paths: PathSnippet[]}) {
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
    [menus]
  );
}

function useMenuSelectedKeys(menus: MenuItem[], paths: PathSnippet[]) {
  return useMemo(
    () => {
      return getSelectedKeys(menus);

      function getSelectedKeys(menus: MenuItem[]) {
        const selectedKeys: string[] = [];

        for (const menu of menus) {
          if (menu.url && paths.find(p => p.url === menu.url)) {
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
    [menus, paths]
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
    [selectedKeys]
  );

  return {openKeys, setOpenKeys};
}

function Breadcrumbs({paths}: {paths: PathSnippet[]}) {
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
    [paths]
  );
}
