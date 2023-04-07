import Nav, {NavRoute} from '../../../shared/components/nav/Nav';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Home from './home/Home';
import SimpleInput from './form/SimpleInput';
import NotFound from '../../../shared/components/not-found/NotFound';
import PostLayout from './posts/PostLayout';
import PostList from './posts/PostList';
import Post from './posts/Post';
import NewPost from './posts/NewPost';
import AuthStatus from './auth/AuthStatus';
import Login from './auth/Login';
import AuthPostRoutes from './posts/AuthPostRoutes';

const ROUTES = [
  {
    to: "/",
    name: "Home",
    state: {hi: "I'm from state of `Link` / `NavLink`"},
    // replace: true
  },
  {
    to: "/posts",
    name: "Posts",
    // end: true
  },
  {
    to: "/simple-input",
    name: "Simple Input Form"
  },
  {
    to: "/redirect-home-by-navigate-component",
    name: "Redirect to Home"
  },
  {
    to: "/abc",
    name: "Page Not Found"
  }
] as NavRoute[];

export default function Root() {
  return (
    <>
      {/* Routes 可以有多个, 比如用于渲染不同效果的导航栏 */}
      <ExtraRoutes/>

      {/* 一次定义全部 Routes */}
      {/* <EntireRoutes/> */}

      {/* 拆分定义 Routes */}
      <SplitRoutes/>
    </>
  );
}

function RootLayout() {
  return (
    <>
      <AuthStatus/>
      <Nav routes={ROUTES}/>
      <Outlet/>
    </>
  );
}

function SplitRoutes() {
  return (
    <Routes>
      {/* 若无需 URL 关联, 仅将 `PostLayout` 作为共同组件使用, 则可省略 `path` */}
      <Route element={<RootLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* 提取 Routes 为组件, 注意此时 `path` 需要为 `/posts/*`, 而非 `/posts` */}
        <Route path="/posts/*" element={<AuthPostRoutes/>}/>
        <Route path="/simple-input" element={<SimpleInput/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route
          path="/redirect-home-by-navigate-component"
          element={
            <Navigate
              to="/"
              state={{hi: "I'm from state of `Navigate`"}}
            />
          }
        />
      </Route>
    </Routes>
  );
}

function EntireRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/posts" element={<PostLayout/>}>
        <Route index element={<PostList/>}/>
        <Route path=":id" element={<Post/>}/>
        <Route path="new" element={<NewPost/>}/>
      </Route>
      <Route path="/simple-input" element={<SimpleInput/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/redirect-home-by-navigate-component" element={<Navigate to="/"/>}/>
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
        <Route path="/login" element={<ExtraComponent message="Login"/>}/>
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
