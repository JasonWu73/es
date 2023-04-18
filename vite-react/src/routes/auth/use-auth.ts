import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {logout, tryLogin, tryUpdateAccessToken} from './auth-slice';

export function useTryLogin() {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(tryLogin(() => {
        if (pathname === '/login') {
          navigate('/', {replace: true});
          return;
        }

        navigate(pathname, {replace: true});
      }));
    },
    []
  );
}

let isInitial = true;

export function useAutoLogout() {
  const expiredAt = useAppSelector(state => state.auth.expiredAt);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (isInitial) return;

      isInitial = false;

      if (expiredAt <= 0) {
        navigate('/login', {replace: true});
        return;
      }

      const currentTimestamp = new Date().getTime();
      const countdownMilliseconds = expiredAt * 1000 - currentTimestamp;

      const timeout = window.setTimeout(
        () => dispatch(logout()),
        countdownMilliseconds
      );

      return () => window.clearTimeout(timeout);
    },
    [expiredAt]
  );
}

export function useAutoUpdateAuth() {
  const {pathname} = useLocation();
  const {expiredAt, refreshToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (pathname === '/login') return;

      if (!expiredAt || !refreshToken) return;

      dispatch(tryUpdateAccessToken());
    },
    [pathname, expiredAt, refreshToken]
  );
}
