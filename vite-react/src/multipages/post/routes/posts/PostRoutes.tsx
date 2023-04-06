import {Route, Routes} from 'react-router-dom';
import PostList from './PostList';
import Post from './Post';
import NewPost from './NewPost';
import PostLayout from './PostLayout';

export default function PostRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PostLayout/>}>
          <Route index element={<PostList/>}/>
          <Route path=":id" element={<Post/>}/>
          <Route path="new" element={<NewPost/>}/>
        </Route>
      </Routes>
    </>
  );
}
