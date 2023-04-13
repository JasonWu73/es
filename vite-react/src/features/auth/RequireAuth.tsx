import {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store-hooks';
import {MenuItem, useAuthorizedMenus} from '../../routes/Root';
import NotFound from '../../components/not-found/NotFound';

export default function RequireAuth({authority, children}: {
  authority: string,
  children: ReactNode
}) {
  const {username} = useAppSelector(state => state.auth);
  const location = useLocation();

  const menus = useAuthorizedMenus();

  if (!username) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  if (!hashAuthority(menus, authority)) {
    return <NotFound/>;
  }

  return (
    <>
      {children}
    </>
  );
}

function hashAuthority(menus: MenuItem[], authority: string): boolean {
  for (const menu of menus) {
    if (menu.authority === authority) return true;

    if (menu.children) {
      return hashAuthority(menu.children, authority);
    }
  }

  return false;
}
