import {Link, Route, Routes} from 'react-router-dom';
import NotFound from '../shared/components/not-found/NotFound';
import Home from './home/Home';
import Counter from './counter/Counter';
import Hello from "./hello/Hello";
import AdminLayout from './AdminLayout';
import {CalculatorOutlined, EditOutlined} from '@ant-design/icons';

export const sidebarMenuRoutes = [
  {
    title: '计数器',
    url: '/counter',
    icon: <CalculatorOutlined/>
  },
  {
    title: '文章列表',
    url: '/hello',
    icon: <EditOutlined/>
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
        <Route element={<AdminLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/counter" element={<Counter/>}/>
          <Route path="/hello" element={<Hello/>}/>
          <Route path="/hello/:id" element={<Hello/>}/>
        </Route>
      </Routes>
    </>
  );
}
