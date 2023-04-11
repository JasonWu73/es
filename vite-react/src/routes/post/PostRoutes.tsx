import {Route, Routes} from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import NewPost from './NewPost';

export default function PostRoutes() {
  return (
    <Routes>
      <Route index element={<PostList/>}/>
      <Route path=":id" element={<Post/>}/>
      <Route path="new" element={<NewPost/>}/>
    </Routes>
  );
}
