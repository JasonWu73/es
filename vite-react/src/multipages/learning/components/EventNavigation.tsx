import classes from './MainNavigation.module.scss';
import {NavLink, Outlet} from 'react-router-dom';

export default function EventNavigation() {
  return (
    <>
      <header>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/events"
                className={({isActive}) => isActive ? classes.active : ''}
                end
              >
                Event List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events/new"
                className={({isActive}) => isActive ? classes.active : ''}
                end
              >
                New Event
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet/>
      </header>
    </>
  );
};
