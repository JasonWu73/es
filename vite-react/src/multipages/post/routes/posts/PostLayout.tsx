import {Outlet} from 'react-router-dom';
import Card from '../../../../shared/components/card/Card';
import Nav, {NavRoute} from '../../../../shared/components/nav/Nav';
import {PostOutletContext} from './post.model';

const ROUTES = [
  {
    to: "/posts/1",
    name: "Post 1"
  },
  {
    to: "/posts/2",
    name: "Post 2"
  },
  {
    to: "/posts/new",
    name: "New Post"
  }
] as NavRoute[];

export default function PostLayout() {
  return (
    <Card>
      <Nav routes={ROUTES}/>

      {/* `Outlet` 类似 `props.children` + `context` */}
      <Outlet context={
        {
          hello: "React Router"
        } as PostOutletContext
      }/>
    </Card>
  );
}
