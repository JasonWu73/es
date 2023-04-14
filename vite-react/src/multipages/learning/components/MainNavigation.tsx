import classes from './MainNavigation.module.scss';
import {NavLink} from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({isActive}) => isActive ? classes.active : ''}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({isActive}) => isActive ? classes.active : ''}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
