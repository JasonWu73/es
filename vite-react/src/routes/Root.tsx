import {Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import AdminLayout from './AdminLayout';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';
import Login from './auth/Login';
import RequireAuth from './auth/RequireAuth';
import {ReactNode, useMemo} from 'react';
import {useAppSelector} from '../store-hooks';
import PostList from './post/PostList';
import PostDetail from './post/PostDetail';
import NewPost from './post/NewPost';

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
        authority: 'post_view',
      },
      {
        title: '新增文章',
        url: '/posts/new',
        authority: 'post_add',
      }
    ]
  }
];

export default function Root() {
  return (
    <Routes>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route element={<AdminLayout/>}>
        <Route path="/" element={<Home/>}/>

        <Route
          path="/counter"
          element={
            <RequireAuth authority="counter">
              <Counter/>
            </RequireAuth>
          }
        />

        <Route
          path="/posts"
          element={
            <RequireAuth authority="post_view">
              <PostList/>
            </RequireAuth>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <RequireAuth authority="post_view">
              <PostDetail/>
            </RequireAuth>
          }
        />
        <Route
          path="/posts/new"
          element={
            <RequireAuth authority="post_add">
              <NewPost/>
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
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
    [MENUS, authorities]
  );
}
