import {ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store-hooks';

export default function RequireAuth({children}: { children: ReactNode }) {
  const {username} = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!username) {
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  return (
    <>
      {children}
    </>
  );
}
