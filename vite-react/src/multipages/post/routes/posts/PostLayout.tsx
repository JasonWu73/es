import {Link, Outlet} from 'react-router-dom';
import Card from '../../../../shared/components/card/Card';
import Nav from '../../../../shared/components/nav/Nav';
import navClasses from '../../../../shared/components/nav/Nav.module.scss';
import {PostOutletContext} from './post.model';

export default function PostLayout() {
  return (
    <Card>
      <Nav>
        <ul>
          <li className={navClasses.active}><Link to="/posts/1">Post 1</Link></li>
          <li><Link to="/posts/2">Post 2</Link></li>
          <li><Link to="/posts/new">New Post</Link></li>
        </ul>
      </Nav>
      {/* `Outlet` 类似 `props.children` + `context` */}
      <Outlet context={
        {
          hello: "React Router"
        } as PostOutletContext
      }/>
    </Card>
  );
}
