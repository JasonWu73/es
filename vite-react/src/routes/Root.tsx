import {Outlet} from 'react-router-dom';
import {useReLogin} from './auth/use-auth';

export default function Root() {
  useReLogin();

  return <Outlet/>;
}
