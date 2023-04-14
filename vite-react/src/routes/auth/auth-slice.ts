import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';

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
      state.expiredAt = 0;
      state.accessToken = '';
      state.refreshToken = '';
      state.authorities = [];
      state.nickname = '';
    }
  }
});

export const authReducer = authSlice.reducer;

export const {setAuth, clearAuth} = authSlice.actions;

export function login(auth: AuthState) {
  return (dispatch: AppDispatch) => {
    setLocalStorage(auth);
    dispatch(setAuth(auth));
    setAutoLogoutTimer(auth.expiredAt, dispatch);
  };
}

export function reLoginFromCache(callback: VoidFunction) {
  return (dispatch: AppDispatch) => {
    const auth = getAuthFromCache();

    if (!auth) {
      return;
    }

    dispatch(setAuth(auth));
    setAutoLogoutTimer(auth.expiredAt, dispatch);

    callback();
  };
}

export function logout() {
  return (dispatch: AppDispatch) => {
    clearLocalStorage();
    tryClearAutoLogoutTimer();
    dispatch(clearAuth());
  };
}

const KEY_AUTH = 'vite_react_auth';

function setLocalStorage(auth: AuthState) {
  localStorage.setItem(KEY_AUTH, JSON.stringify(auth));
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_AUTH);
}

function getAuthFromCache() {
  const authJson = localStorage.getItem(KEY_AUTH);

  if (!authJson) {
    return null;
  }

  return JSON.parse(authJson) as AuthState;
}

let logoutTimer: number;

function setAutoLogoutTimer(expiredAt: number, dispatch: AppDispatch) {
  tryClearAutoLogoutTimer();

  const currentTimestamp = new Date().getTime();
  const countdownMilliseconds = expiredAt * 1000 - currentTimestamp;

  logoutTimer = window.setTimeout(
    () => {
      clearLocalStorage();
      dispatch(clearAuth());
    },
    countdownMilliseconds
  );
}

function tryClearAutoLogoutTimer() {
  if (logoutTimer) {
    window.clearTimeout(logoutTimer);
  }
}
