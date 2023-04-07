import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';
import {wait} from '../../shared/utils/promisify';

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
    dispatch(setAuth(auth));
  };
}

export function logout() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await wait(1);
    dispatch(clearAuth());
  };
}
