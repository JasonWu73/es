import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store';
import { getAccessTokenApi, updateAccessTokenApi } from './auth-api';
import { apiAxios } from '@/utils/http';
import { AxiosError } from 'axios';
import { sendRequest } from '@/components/layout/ui-slice';
import { needsLogout } from '@/hooks/use-http';

export interface AuthState {
  userId: number;
  username: string;
  expiredAt: number;
  accessToken: string;
  refreshToken: string;
  authorities: string[];
  nickname: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: 0,
    username: '',
    expiredAt: 0,
    accessToken: '',
    refreshToken: '',
    authorities: [],
    nickname: ''
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.expiredAt = action.payload.expiredAt;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.authorities = action.payload.authorities;
      state.nickname = action.payload.nickname;
    },
    clearAuth: (state) => {
      state.userId = 0;
      state.username = '';
      state.expiredAt = -1;
      state.accessToken = '';
      state.refreshToken = '';
      state.authorities = [];
      state.nickname = '';
    }
  }
});

export const authReducer = authSlice.reducer;

export const { setAuth, clearAuth } = authSlice.actions;

export function getAccessTokenRequest(
  username: string,
  password: string,
  callback: () => void
) {
  const isValidUsername = username === 'admin' || username === 'user';
  const isValidPassword = password === '123';

  return (dispatch: AppDispatch) => {
    dispatch(sendRequest(
      getAccessTokenApi({
        username: isValidUsername ? 'kminchelle' : username,
        password: isValidPassword ? '0lelplR' : password
      }),
      data => {
        const { token: accessToken } = data;

        const expiresInSeconds = 120;
        const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
        const expiredAt = currentTimestampSeconds + expiresInSeconds;

        const userId = username === 'admin' ? 1 : 2;
        const authorities = username === 'admin' ? ['counter', 'post'] : ['post'];
        const nickname = username === 'admin' ? '测试管理员' : '测试用户';

        const authData = {
          userId,
          username,
          expiredAt,
          accessToken,
          refreshToken: accessToken,
          authorities,
          nickname
        };

        dispatch(login(authData));

        callback();
      }
    ));
  };
}

export function login(auth: AuthState) {
  return (dispatch: AppDispatch) => {
    dispatch(setAuth(auth));
    setLocalStorage(auth);
  };
}

export function tryLogin(callback: () => void) {
  return (dispatch: AppDispatch) => {
    const auth = getAuthFromLocalStorage();
    if (!auth) return;

    dispatch(login(auth));
    callback();
  };
}

export function logout() {
  return (dispatch: AppDispatch) => {
    dispatch(clearAuth());
    clearLocalStorage();
  };
}

let pending = false;

export function tryUpdateAccessToken() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    if (pending) return;

    const { expiredAt, refreshToken } = getState().auth;

    const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
    const countdownSeconds = expiredAt - currentTimestampSeconds;
    const updateWhenLessThanSeconds = 60;

    if (countdownSeconds <= updateWhenLessThanSeconds) {
      pending = true;
      const expiresInSeconds = 120;
      const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
      const expiredAt = currentTimestampSeconds + expiresInSeconds;

      apiAxios(updateAccessTokenApi(refreshToken)).then(response => {
        const { data } = response;

        dispatch(
          login({
            userId: 7,
            username: 'refreshed_admin',
            expiredAt: expiredAt,
            accessToken: data.token,
            refreshToken: data.token,
            authorities: ['counter', 'post'],
            nickname: data.token.slice(-10)
          })
        );
      }).catch(error => {
        const axiosError = error as AxiosError;
        if (needsLogout(dispatch, axiosError)) return;
      }).finally(() => {
        pending = false;
      });
    }
  };
}

const KEY_AUTH = 'vite_react_auth';

export function clearLocalStorage() {
  localStorage.removeItem(KEY_AUTH);
}

function setLocalStorage(auth: AuthState) {
  localStorage.setItem(KEY_AUTH, JSON.stringify(auth));
}

function getAuthFromLocalStorage() {
  const authJson = localStorage.getItem(KEY_AUTH);
  if (!authJson) return null;

  return JSON.parse(authJson) as AuthState;
}
