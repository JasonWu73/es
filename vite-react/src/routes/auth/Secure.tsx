import {ReactNode, Suspense} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store-hooks';
import NotFound from '../../components/not-found/NotFound';
import {MenuItem, useAuthorizedMenus} from '../../App';
import SuspenseLoading from '../../components/loading/SuspenseLoading';

export default function Secure(
  {authority, children}: { authority: string, children: ReactNode }
) {
  const username = useAppSelector(state => state.auth.username);
  const location = useLocation();
  const menus = useAuthorizedMenus();

  if (!username) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  if (!hasAuthority(menus, authority)) {
    return <NotFound/>;
  }

  return (
    <SuspenseLoading>
      {children}
    </SuspenseLoading>
  );
}

function hasAuthority(menus: MenuItem[], authority: string): boolean {
  for (const menu of menus) {
    if (menu.authority === authority) {
      return true;
    }

    if (menu.children && menu.children.length > 0) {
      return hasAuthority(menu.children, authority);
    }
  }

  return false;
}
