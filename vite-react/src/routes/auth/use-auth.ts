import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {login, logout, tryLogin} from './auth-slice';
import {useHttp} from '../../hooks/use-http';
import {refreshAccessTokenApi} from './auth-api';

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

export function useAutoLogout() {
  const expiredAt = useAppSelector(state => state.auth.expiredAt);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (expiredAt <= 0) {
        return;
      }

      const currentTimestamp = new Date().getTime();
      const countdownMilliseconds = expiredAt * 1000 - currentTimestamp;

      const timeout = window.setTimeout(
        () => {
          dispatch(logout(() => navigate('/login', {replace: true})));
        },
        countdownMilliseconds
      );

      return () => window.clearTimeout(timeout);
    },
    [expiredAt]
  );
}

export function useAutoRefreshAuth() {
  const {pathname} = useLocation();
  const {expiredAt, refreshToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {sendRequest} = useHttp();

  useEffect(
    () => {
      if (pathname === '/login') {
        return;
      }

      if (!expiredAt || !refreshToken) {
        return;
      }

      const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
      const countdownSeconds = expiredAt - currentTimestampSeconds;
      const refreshWhenLessThanSeconds = 120;
      let timeout: number;

      if (countdownSeconds <= refreshWhenLessThanSeconds) {
        timeout = window.setTimeout(
          () => {
            const expiresInSeconds = 300;
            const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
            const expiredAt = currentTimestampSeconds + expiresInSeconds;

            sendRequest(
              refreshAccessTokenApi(refreshToken),
              (data: { token: string }) => {
                dispatch(
                  login({
                    userId: 7,
                    username: 'refreshed_admin',
                    expiredAt: expiredAt,
                    accessToken: data.token,
                    refreshToken: data.token,
                    authorities: ['counter', 'post'],
                    nickname: 'Refreshed Admin'
                  })
                );
              }
            );
          },
          5000
        );
      }

      return () => {
        timeout && window.clearTimeout(timeout);
      };
    },
    [pathname]
  );
}
