import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';
import {wait} from '../../shared/utils/promisify';
import {userInfo} from 'os';

interface AuthState {
  userId: number;
  username: string;
}

export const counterSlice = createSlice({
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

export const authReducer = counterSlice.reducer;

export const {setAuth, clearAuth} = counterSlice.actions;

export function login(auth: AuthState) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await wait(1);
    setLocalStorage(auth);
    dispatch(setAuth(auth));
  };
}

export function logout() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await wait(1);
    clearLocalStorage();
    dispatch(clearAuth());
  };
}

const KEY_USER_ID = 'user_id';
const KEY_USERNAME = 'username';

export function reLoginFromCache() {
  setAuth({
    userId: +localStorage.getItem(KEY_USER_ID)!,
    username: localStorage.getItem(KEY_USERNAME)!
  });
}

function setLocalStorage({userId, username}: AuthState) {
  localStorage.setItem(KEY_USER_ID, userId.toString());
  localStorage.setItem(KEY_USERNAME, username);
}

function clearLocalStorage() {
  localStorage.removeItem(KEY_USER_ID);
  localStorage.removeItem(KEY_USERNAME);
}
