import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';

interface AuthState {
  userId: number | null;
  username: string | null;
  expiredAt: number | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    username: null,
    expiredAt: null
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.expiredAt = action.payload.expiredAt;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.username = null;
      state.expiredAt = null;
    }
  }
});

export const authReducer = authSlice.reducer;

export const {setAuth, clearAuth} = authSlice.actions;

export function login(auth: AuthState) {
  return async (dispatch: AppDispatch) => {
    setLocalStorage(auth);
    dispatch(setAuth(auth));

    setupAutoLogout(auth.expiredAt!, () => {
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

const KEY_USER_ID = 'vite_react_user_id';
const KEY_USERNAME = 'vite_react_username';
const KEY_EXPIRED_AT = 'vite_react_expired_at';

export function reLoginFromCache(callback: VoidFunction) {
  return async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem(KEY_USER_ID);
    const username = localStorage.getItem(KEY_USERNAME);
    const expiredAt = localStorage.getItem(KEY_EXPIRED_AT);
    if (!userId || !username || !expiredAt) return;

    dispatch(setAuth({
      userId: +userId,
      username,
      expiredAt: +expiredAt
    }));

    setupAutoLogout(+expiredAt, () => {
      clearLocalStorage();
      dispatch(clearAuth());
    });

    callback();
  };
}

function setLocalStorage({userId, username, expiredAt}: AuthState) {
  localStorage.setItem(KEY_USER_ID, userId + '');
  localStorage.setItem(KEY_USERNAME, username!);
  localStorage.setItem(KEY_EXPIRED_AT, expiredAt + '');
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_USER_ID);
  localStorage.removeItem(KEY_USERNAME);
  localStorage.removeItem(KEY_EXPIRED_AT);
}

let loginTimeout: number;

function setupAutoLogout(expiredAt: number, logout: VoidFunction) {
  if (loginTimeout) {
    clearTimeout(loginTimeout);
  }

  const currentTimestamp = Math.floor(new Date().getTime());
  const countdownMilliseconds = expiredAt * 1000 - currentTimestamp;
  loginTimeout = window.setTimeout(logout, countdownMilliseconds);
}
