import classes from './MainNavigation.module.scss';
import {NavLink} from 'react-router-dom';

const ROUTES: { path: string, name: string }[] = [
  {path: '/', name: 'Home'},
  {path: '/events', name: 'Event List'}
];

export default function MainNavigation() {
  return (
    <>
      <header>
        <nav className={classes.nav}>
          <ul>
            {ROUTES.map(route =>
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={({isActive}) => isActive ? classes.active : ''}
                >
                  {route.name}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
