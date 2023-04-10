import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';

interface AuthState {
  userId: number | null;
  username: string | null;
  expiresInSeconds: number | null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    username: null,
    expiresInSeconds: null
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.expiresInSeconds = action.payload.expiresInSeconds;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.username = null;
      state.expiresInSeconds = null;
    }
  }
});

export const authReducer = authSlice.reducer;

export const {setAuth, clearAuth} = authSlice.actions;

export function login(auth: AuthState) {
  return async (dispatch: AppDispatch) => {
    setLocalStorage(auth);
    dispatch(setAuth(auth));
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
const KEY_EXPIRES_IN = 'vite_react_expires_in';

export function reLoginFromCache(callback: VoidFunction) {
  return async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem(KEY_USER_ID);
    const username = localStorage.getItem(KEY_USERNAME);
    const expiresInSeconds = localStorage.getItem(KEY_EXPIRES_IN);
    if (!userId || !username || !expiresInSeconds) return;

    dispatch(setAuth({
      userId: +userId,
      username,
      expiresInSeconds: +expiresInSeconds
    }));
    callback();
  };
}

function setLocalStorage({userId, username, expiresInSeconds}: AuthState) {
  localStorage.setItem(KEY_USER_ID, userId + '');
  localStorage.setItem(KEY_USERNAME, username!);
  localStorage.setItem(KEY_EXPIRES_IN, expiresInSeconds + '');
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_USER_ID);
  localStorage.removeItem(KEY_USERNAME);
  localStorage.removeItem(KEY_EXPIRES_IN);
}
