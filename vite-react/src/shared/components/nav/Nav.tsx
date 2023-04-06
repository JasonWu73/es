import classes from './Nav.module.scss';
import {NavLink} from 'react-router-dom';

interface Route {
  to: string;
  name: string;
  replace?: boolean;
}

interface Props {
  routes: Route[]
}

export default function Nav({routes}: Props) {
  return (
    <nav className={classes.nav}>
      <ul>
        {routes.map(route =>
          <NavItem
            key={route.to}
            to={route.to}
            name={route.name}
            replace={route.replace}
          />)
        }
      </ul>
    </nav>
  );
}

function NavItem({to, name, replace = false}: Route) {
  return (
    <li>
      {/* `Link` 属性:
        `replace`: 仅替换当前 URL, 使替换前的 URL 不加入 history, 即回退浏览历史时会退两级. 常用于登录页
        `state`: 路由间传递数据, 且不影响 URL
      */}
      {/* A <NavLink> is a special kind of <Link> that knows whether it is "active" or "pending" */}
      <NavLink
        to={to}
        className={({isActive}) => isActive ? classes.active : ''}
        replace={replace}
      >
        {({isActive}) => {
          return isActive ? `Active ${name}` : `${name}`;
        }}
      </NavLink>
    </li>
  );
}
