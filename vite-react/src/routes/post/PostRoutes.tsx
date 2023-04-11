import {Route, Routes} from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import NewPost from './NewPost';
import {EditOutlined} from '@ant-design/icons';
import {MenuItem} from '../Root';
import {useAppSelector} from '../../store-hooks';

export const POST_MENUS: MenuItem = {
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
};

export default function PostRoutes() {
  const authorities = useAppSelector(state => state.auth.authorities);

  if (authorities.indexOf('post') !== -1) {
    return (
      <>
        <Routes>
          <Route index element={<PostList/>}/>
          <Route path=":id" element={<Post/>}/>
          <Route path="new" element={<NewPost/>}/>
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        {
          authorities.indexOf('post_view') !== -1 &&
          <Route index element={<PostList/>}/>
        }
        {
          authorities.indexOf('post_view') !== -1 &&
          <Route path=":id" element={<Post/>}/>
        }
        {
          authorities.indexOf('post_add') !== -1 &&
          <Route path="new" element={<NewPost/>}/>
        }
      </Routes>
    </>
  );
}
