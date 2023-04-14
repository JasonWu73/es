import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from './components/not-found/NotFound';
import AdminLayout from './routes/layout/AdminLayout';
import Login from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';
import Counter from './features/counter/Counter';
import PostList from './features/post/PostList';
import PostDetail from './features/post/PostDetail';
import NewPost from './features/post/NewPost';
import Home from './features/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
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
