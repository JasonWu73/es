import {Outlet} from 'react-router-dom';
import {useAutoLogout, useTryLogin, useAutoRefreshAuth} from './auth/use-auth';

export default function Root() {
  useTryLogin();
  useAutoLogout();
  useAutoRefreshAuth();

  return <Outlet/>;
}
