import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector } from './store-hooks';
import AdminLayout from './routes/AdminLayout';
import Home from './routes/home/Home';
import Secure from './routes/auth/Secure';
import { delayForDemo } from './utils/promisify';
import Root from './routes/Root';
import SuspenseLoading from '@/components/loading/SuspenseLoading';
import { AiOutlineCalculator, AiOutlineHome } from 'react-icons/ai';
import { BsPen } from 'react-icons/bs';

export interface MenuItem {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  authority?: string;
  children?: MenuItem[];
}

const MENUS: MenuItem[] = [
  {
    title: '首页',
    url: '/',
    icon: <AiOutlineHome />
  },
  {
    title: '计数器',
    url: '/counter',
    icon: <AiOutlineCalculator />,
    authority: 'counter'
  },
  {
    title: '文章列表',
    icon: <BsPen />,
    authority: 'post',
    children: [
      {
        title: '所有文章',
        url: '/posts',
        authority: 'post_view'
      },
      {
        title: '新增文章',
        url: '/posts/new',
        authority: 'post_add'
      }
    ]
  }
];

const ErrorPage = React.lazy(() => import('@/routes/error/ErrorPage'));
const Login = React.lazy(() => import('@/routes/auth/Login'));
const Counter = React.lazy(() => delayForDemo(import('@/routes/counter/Counter')));
const PostList = React.lazy(() => import('@/routes/post/PostList'));
const PostDetail = React.lazy(() => import('@/routes/post/PostDetail'));
const NewPost = React.lazy(() => import('@/routes/post/NewPost'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <SuspenseLoading><ErrorPage /></SuspenseLoading>,
    children: [
      {
        path: 'login',
        element: <SuspenseLoading><Login /></SuspenseLoading>
      },
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            children: [
              {
                path: 'counter',
                element: <Secure authority="counter"><Counter /></Secure>
              },
              {
                path: 'posts',
                children: [
                  {
                    index: true,
                    element: <Secure authority="post_view"><PostList /></Secure>
                  },
                  {
                    path: ':postId',
                    element: <Secure authority="post_view"><PostDetail /></Secure>
                  },
                  {
                    path: 'new',
                    element: <Secure authority="post_add"><NewPost /></Secure>
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

export function useAuthorizedMenus() {
  const authorities = useAppSelector(state => state.auth.authorities);

  return React.useMemo(
    () => {
      return getAuthorizedMenus(MENUS);

      function getAuthorizedMenus(menus: MenuItem[]) {
        const filteredMenus: MenuItem[] = [];

        for (const menu of menus) {
          if (!menu.authority || authorities.indexOf(menu.authority) !== -1) {
            filteredMenus.push(menu);
            continue;
          }

          if (menu.children && menu.children.length > 0) {
            const submenus = getAuthorizedMenus(menu.children);

            if (submenus.length > 0) {
              filteredMenus.push({ ...menu, children: submenus });
            }
          }
        }

        return filteredMenus;
      }
    },
    [JSON.stringify(authorities)]
  );
}
