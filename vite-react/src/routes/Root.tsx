import {Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import AdminLayout from './AdminLayout';
import {CalculatorOutlined} from '@ant-design/icons';
import Login from './auth/Login';
import PostRoutes, {POST_MENUS} from './post/PostRoutes';
import RequireAuth from './auth/RequireAuth';
import {ReactNode, useMemo} from 'react';
import {useAppSelector} from '../store-hooks';

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
  POST_MENUS
];

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
  const authorities = useAppSelector(state => state.auth.authorities);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Home/>}/>
          {
            authorities.indexOf('counter') !== -1 &&
            <Route path="/counter" element={<RequireAuth><Counter/></RequireAuth>}/>
          }
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
