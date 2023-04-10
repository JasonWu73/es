import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';

interface AuthState {
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
  return async (dispatch: AppDispatch) => {
    setLocalStorage(auth);
    dispatch(setAuth(auth));

    setupAutoLogout(auth.expiredAt, () => {
      clearLocalStorage();
      dispatch(clearAuth());
    });
  };
}

export function logout(callback: VoidFunction) {
  return async (dispatch: AppDispatch) => {
    clearLocalStorage();
    dispatch(clearAuth());
    callback();
  };
}

const KEY_AUTH = 'vite_react_auth';

export function reLoginFromCache(callback: VoidFunction) {
  return async (dispatch: AppDispatch) => {
    const authJson = localStorage.getItem(KEY_AUTH);
    if (!authJson) return;

    const authData = JSON.parse(authJson) as AuthState;
    dispatch(setAuth(authData));

    setupAutoLogout(authData.expiredAt, () => {
      clearLocalStorage();
      dispatch(clearAuth());
    });

    callback();
  };
}

function setLocalStorage(auth: AuthState) {
  localStorage.setItem(KEY_AUTH, JSON.stringify(auth));
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_AUTH);
}

let loginTimeout: number;

function setupAutoLogout(expiredAt: number, logout: VoidFunction) {
  if (loginTimeout) {
    clearTimeout(loginTimeout);
  }

  const currentTimestamp = new Date().getTime();
  const countdownMilliseconds = expiredAt * 1000 - currentTimestamp;
  loginTimeout = window.setTimeout(logout, countdownMilliseconds);
}
