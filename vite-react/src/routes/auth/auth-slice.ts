import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';

interface AuthState {
  userId: number;
  username: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null!,
    username: null!
  } as AuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const {userId, username} = action.payload;
      state.userId = userId;
      state.username = username;
    },
    clearAuth: (state) => {
      state.userId = null!;
      state.username = null!;
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

const KEY_USER_ID = 'user_id';
const KEY_USERNAME = 'username';

export function reLoginFromCache(callback: VoidFunction) {
  return async (dispatch: AppDispatch) => {
    const userId = +localStorage.getItem(KEY_USER_ID)!;
    const username = localStorage.getItem(KEY_USERNAME)!;
    if (!userId || !username) return;

    dispatch(setAuth({userId, username}));
    callback();
  };
}

function setLocalStorage({userId, username}: AuthState) {
  localStorage.setItem(KEY_USER_ID, userId.toString());
  localStorage.setItem(KEY_USERNAME, username);
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_USER_ID);
  localStorage.removeItem(KEY_USERNAME);
}
