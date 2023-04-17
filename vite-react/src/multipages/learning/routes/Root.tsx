import {Outlet} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import Button from '../../../components/button/Button';

export default function Root() {
  return (
    <>
      <MainNavigation/>
      <Button disabled>Button</Button>
      <main>
        <Outlet/>
      </main>
    </>
  );
}
