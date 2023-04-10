import {Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import AdminLayout from './AdminLayout';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';
import Login from './auth/Login';
import PostRoutes from './post/PostRoutes';
import RequireAuth from './auth/RequireAuth';
import {ReactNode, useMemo} from 'react';
import {useAppSelector} from '../store-hooks';

export interface MenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  authority: string;
  children?: MenuItem[];
}

const MENUS = [
  {
    title: '计数器',
    url: '/counter',
    icon: <CalculatorOutlined/>,
    authority: 'counter'
  },
  {
    title: '文章列表',
    icon: <EditOutlined/>,
    authority: 'post',
    children: [
      {
        title: '所有文章',
        url: '/posts',
        authority: 'post_view',
      },
      {
        title: '文章一',
        url: '/posts/1',
        authority: 'post_view',
      },
      {
        title: '文章二',
        url: '/posts/2',
        authority: 'post_view',
      },
      {
        title: '新增文章',
        url: '/posts/new',
        authority: 'post_add',
      }
    ]
  }
] as MenuItem[];

export const PAGES = [
  {
    title: 'React Redux',
    url: 'counter/index.html',
    description: '单独测试 React Redux'
  },
  {
    title: 'React Router',
    url: 'post/index.html',
    description: '单独测试 React Router'
  }
];

export default function Root() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/counter" element={<RequireAuth><Counter/></RequireAuth>}/>
          <Route path="/posts/*" element={<RequireAuth><PostRoutes/></RequireAuth>}/>
        </Route>
      </Routes>
    </>
  );
}

export function useAuthorizedMenus() {
  const authorities = useAppSelector(state => state.auth.authorities);

  return useMemo(
    () => {
      return getMenus(MENUS);

      function getMenus(items: MenuItem[]) {
        const menus = [] as MenuItem[];

        for (const item of items) {
          if (authorities.indexOf(item.authority) !== -1) {
            menus.push(item);
            continue;
          }

          if (!item.url && item.children) {
            const childMenus = getMenus(item.children);

            if (childMenus.length > 0) {
              const newParent = {...item, children: childMenus};

              menus.push(newParent);
            }
          }
        }

        return menus;
      }
    },
    [authorities]
  );
}

export function useAuthorizedUrls() {
  const authorities = useAppSelector(state => state.auth.authorities);

  return useMemo(
    () => {
      return getUrls(MENUS);

      function getUrls(items: MenuItem[]) {
        const urls = [] as string[];

        for (const item of items) {
          if (authorities.indexOf(item.authority) !== -1) {
            if (item.url) {
              urls.push(item.url);
            }

            if (item.children) {
              const childUrls = getChildUrls(item.children);

              if (childUrls.length > 0) {
                urls.push(...childUrls);
              }
            }
          }

          if (item.children) {
            const childUrls = getUrls(item.children);

            if (childUrls.length > 0) {
              urls.push(...childUrls);
            }
          }
        }

        return urls;
      }

      function getChildUrls(items: MenuItem[]) {
        const urls = [] as string[];

        for (const item of items) {
          urls.push(item.url);

          if (item.children) {
            const childUrls = getChildUrls(item.children);

            if (childUrls.length > 0) {
              urls.push(...childUrls);
            }
          }
        }

        return urls;
      }
    },
    [authorities]
  );
}
