import {Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import AdminLayout from './AdminLayout';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';
import Login from './auth/Login';
import PostRoutes from './post/PostRoutes';
import RequireAuth from './auth/RequireAuth';
import {ReactNode} from 'react';

export interface MenuItem {
  title: string;
  url: string;
  icon?: ReactNode;
  authority: string;
  children?: MenuItem[];
}

export const MENUS = [
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
