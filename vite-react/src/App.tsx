import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from './components/not-found/NotFound';
import Root from './routes/Root';
import Login from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';
import Counter from './features/counter/Counter';
import PostList from './features/post/PostList';
import PostDetail from './features/post/PostDetail';
import NewPost from './features/post/NewPost';
import Home from './features/home/Home';
import {ReactNode, useMemo} from 'react';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';
import {useAppSelector} from './store-hooks';

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
  authority: string;
  children?: MenuItem[];
}

const MENUS: MenuItem[] = [
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <NotFound/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'counter', element: <RequireAuth authority="counter"><Counter/></RequireAuth>},
      {path: 'posts', element: <RequireAuth authority="post_view"><PostList/></RequireAuth>},
      {path: 'posts/:postId', element: <RequireAuth authority="post_view"><PostDetail/></RequireAuth>},
      {path: 'posts/new', element: <RequireAuth authority="post_add"><NewPost/></RequireAuth>}
    ]
  },
  {path: '/login', element: <Login/>}
]);

export default function App() {
  return <RouterProvider router={router}/>;
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
    [JSON.stringify(authorities)]
  );
}
