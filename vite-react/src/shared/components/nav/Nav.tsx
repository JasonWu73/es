import classes from './Nav.module.scss';
import {NavLink} from 'react-router-dom';

export interface NavRoute {
  to: string;
  name: string;
  state?: object;
  replace?: boolean;
  end?: boolean;
}

interface Props {
  routes: NavRoute[]
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
            state={route.state}
            replace={route.replace}
            end={route.end}
          />)
        }
      </ul>
    </nav>
  );
}

function NavItem({to, name, state, replace = false, end = false}: NavRoute) {
  return (
    <li>
      {/* `Link` 属性:
        `replace`: 仅替换当前 URL, 使替换前的 URL 不加入 history, 即回退浏览历史时会退两级. 常用于登录页
        `state`: 路由间传递数据, 且不影响 URL, 这和 `useSearchParams` 不同
      */}
      {/* A <NavLink> is a special kind of <Link> that knows whether it is "active" or "pending" */}
      <NavLink
        to={to}
        state={state}
        className={({isActive}) => isActive ? classes.active : ''}
        replace={replace}
        end={end}
      >
        {({isActive}) => {
          return isActive ? `Active ${name}` : `${name}`;
        }}
      </NavLink>
    </li>
  );
}
