import Nav from '../../../shared/components/nav/Nav';
import navClasses from '../../../shared/components/nav/Nav.module.scss';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import PostList from './posts/PostList';
import SimpleInput from './form/SimpleInput';
import Post from './posts/Post';
import NewPost from './posts/NewPost';
import NotFound from '../../../shared/components/not-found/NotFound';

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
        <Route path="/posts">
          <Route index element={<PostList/>}/>
          <Route path=":id" element={<Post/>}/>
          <Route path="new" element={<NewPost/>}/>
        </Route>
        {/*
        <Route path="/posts" element={<PostList/>}/>
        <Route path="/posts/:id" element={<Post/>}/>
        <Route path="/posts/new" element={<NewPost/>}/>
        */}
        <Route path="/simple-input" element={<SimpleInput/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}
