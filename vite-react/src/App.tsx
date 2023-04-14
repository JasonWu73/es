import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from './components/not-found/NotFound';
import Root from './routes/Root';
import Login from './features/auth/Login';
import Secure from './features/auth/Secure';
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
      {path: 'counter', element: <Secure authority="counter"><Counter/></Secure>},
      {path: 'posts', element: <Secure authority="post_view"><PostList/></Secure>},
      {path: 'posts/:postId', element: <Secure authority="post_view"><PostDetail/></Secure>},
      {path: 'posts/new', element: <Secure authority="post_add"><NewPost/></Secure>}
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
      return getAuthorizedMenus(MENUS);

      function getAuthorizedMenus(menus: MenuItem[]) {
        const filteredMenus: MenuItem[] = [];

        for (const menu of menus) {
          if (authorities.indexOf(menu.authority) !== -1) {
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
