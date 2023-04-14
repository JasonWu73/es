import classes from './Root.module.scss';
import {Outlet} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function Root() {
  return (
    <>
      <MainNavigation/>
      <main className={classes.content}>
        <Outlet/>
      </main>
    </>
  );
}
