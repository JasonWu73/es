import Nav from '../../../shared/components/nav/Nav';
import navClasses from '../../../shared/components/nav/Nav.module.scss';
import {Link, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import SimpleInput from './form/SimpleInput';
import NotFound from '../../../shared/components/not-found/NotFound';
import PostRoutes from './posts/PostRoutes';
import PostLayout from './posts/PostLayout';
import PostList from './posts/PostList';
import Post from './posts/Post';
import NewPost from './posts/NewPost';

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
      {/* Routes 可以有多个, 比如用于渲染不同效果的导航栏 */}
      <ExtraRoutes/>
      {/* <EntireRoutes/> */}
      <SplitRoutes/>
    </>
  );
}

function SplitRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* 提取 Routes 为组件, 注意此时 `path` 需要为 `/posts/*`, 而非 `/posts` */}
      <Route path="/posts/*" element={<PostRoutes/>}/>
      <Route path="/simple-input" element={<SimpleInput/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

function EntireRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* 若无需 URL 关联, 仅将 `PostLayout` 作为共同组件使用, 则可省略 `path` */}
      {/* <Route element={<PostLayout/>}> */}
      <Route path="/posts" element={<PostLayout/>}>
        <Route index element={<PostList/>}/>
        <Route path=":id" element={<Post/>}/>
        <Route path="new" element={<NewPost/>}/>
      </Route>
      <Route path="/simple-input" element={<SimpleInput/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

function ExtraRoutes() {
  return (
    <>
      {/* 还可通过 `location` 静态指定一个额外组件, 此时则可不必写全所有 `Route` */}
      {/* <Routes location="/posts"> */}
      <Routes>
        <Route path="/" element={<ExtraComponent message="Home"/>}/>
        <Route path="/posts">
          <Route index element={<ExtraComponent message="Post List"/>}/>
          <Route path=":id" element={<ExtraComponent message="Post Details"/>}/>
          <Route path="new" element={<ExtraComponent message="Create Post"/>}/>
        </Route>
        <Route path="/simple-input" element={<ExtraComponent message="Simple Input Form"/>}/>
        <Route path="*" element={<ExtraComponent message="404 Page Not Found"/>}/>
      </Routes>
    </>
  );
}

function ExtraComponent({message}: { message: string }) {
  return (
    <h2>{`${message} (Extra Route Component)`}</h2>
  );
}
