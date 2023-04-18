import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {lazy, ReactNode, useMemo} from 'react';
import {CalculatorOutlined, FormOutlined, HomeOutlined} from '@ant-design/icons';
import {useAppSelector} from './store-hooks';
import AdminLayout from './routes/layout/AdminLayout';
import Home from './routes/home/Home';
import ErrorBoundary from './routes/error/ErrorBoundary';
import Secure from './routes/auth/Secure';
import {delayForDemo} from './utils/promisify';
import Login from './routes/auth/Login';
import PostList from './routes/post/PostList';
import PostDetail from './routes/post/PostDetail';
import NewPost from './routes/post/NewPost';
import Root from './routes/Root';

export const PAGES = [
  {
    title: 'Learning',
    url: '/learning/index.html',
    description: 'Learning never exhausts the mind.'
  }
];

export interface MenuItem {
  title: string;
  url?: string;
  icon?: ReactNode;
  authority?: string;
  children?: MenuItem[];
}

const MENUS: MenuItem[] = [
  {
    title: '首页',
    url: '/',
    icon: <HomeOutlined/>
  },
  {
    title: '计数器',
    url: '/counter',
    icon: <CalculatorOutlined/>,
    authority: 'counter'
  },
  {
    title: '文章列表',
    icon: <FormOutlined/>,
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

const Counter = lazy(() => delayForDemo(import('./routes/counter/Counter')));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        element: <AdminLayout/>,
        children: [
          {index: true, element: <Home/>},
          {
            children: [
              {path: 'counter', element: <Secure authority="counter"><Counter/></Secure>},
              {
                path: 'posts',
                children: [
                  {index: true, element: <Secure authority="post_view"><PostList/></Secure>},
                  {path: ':postId', element: <Secure authority="post_view"><PostDetail/></Secure>},
                  {path: 'new', element: <Secure authority="post_add"><NewPost/></Secure>}
                ]
              }
            ]
          }
        ]
      },
      {path: 'login', element: <Login/>},
      {path: '*', element: <ErrorBoundary/>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router}/>;
}

export function useAuthorizedMenus() {
  const authorities = useAppSelector(state => state.auth.authorities);

  return useMemo(
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
              filteredMenus.push({...menu, children: submenus});
            }
          }
        }

        return filteredMenus;
      }
    },
    [JSON.stringify(authorities)]
  );
}
