import Nav from '../../../shared/components/nav/Nav';
import navClasses from '../../../shared/components/nav/Nav.module.scss';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import PostList from './posts/PostList';
import SimpleInput from './form/SimpleInput';
import Post from './posts/Post';
import NewPost from './posts/NewPost';
import NotFound from '../../../shared/components/not-found/NotFound';
import PostLayout from './posts/PostLayout';

export default function Root() {
  return (
    <>
      <Nav>
        <ul>
          <li className={navClasses.active}><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/simple-input">Simple Input Form</Link></li>
        </ul>
      </Nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* 若无需 URL 关联, 仅将 `PostLayout` 作为共同组件使用, 则可省略 `path` */}
        <Route path="/posts" element={<PostLayout/>}>
          <Route index element={<PostList/>}/>
          <Route path=":id" element={<Post/>}/>
          <Route path="new" element={<NewPost/>}/>
        </Route>
        <Route path="/simple-input" element={<SimpleInput/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}
