import {Outlet} from 'react-router-dom';
import {useAutoLogout, useTryLogin, useAutoUpdateAuth} from './auth/use-auth';

export default function Root() {
  useTryLogin();
  useAutoLogout();
  useAutoUpdateAuth();

  return <Outlet/>;
}
