import {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store-hooks';
import {useAuthorizedUrls} from '../Root';
import NotFound from '../../shared/components/not-found/NotFound';

export default function RequireAuth({children}: { children: ReactNode }) {
  const {username} = useAppSelector(state => state.auth);
  const location = useLocation();
  const urls = useAuthorizedUrls();

  if (!username) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  const authPassed = urls.indexOf(location.pathname) !== -1;

  if (!authPassed) {
    return <NotFound/>
  }

  return (
    <>
      {children}
    </>
  );
}
