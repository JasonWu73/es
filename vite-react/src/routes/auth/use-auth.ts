import {useAppDispatch} from '../../store-hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {reLoginFromCache} from './auth-slice';

export function useReLogin() {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(
        reLoginFromCache(() => {
          if (pathname === '/login') {
            navigate('/', {replace: true});
            return;
          }

          navigate(pathname, {replace: true});
        })
      );
    },
    []
  );
}
