import {Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import AdminLayout from './AdminLayout';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';
import Login from './auth/Login';
import PostRoutes from './post/PostRoutes';

export const sidebarMenuRoutes = [
  {
    title: '计数器',
    url: '/counter',
    icon: <CalculatorOutlined/>,
  },
  {
    title: '文章列表',
    icon: <EditOutlined/>,
    children: [
      {
        title: '所有文章',
        url: '/posts'
      },
      {
        title: '文章一',
        url: '/posts/1'
      },
      {
        title: '文章二',
        url: '/posts/2'
      },
      {
        title: '新增文章',
        url: '/posts/new'
      }
    ]
  }
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
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/counter" element={<Counter/>}/>
          {/* <Route path="/posts/*" element={<RequireAuth><PostRoutes/></RequireAuth>}/> */}
          <Route path="/posts/*" element={<PostRoutes/>}/>
        </Route>
      </Routes>
    </>
  );
}
