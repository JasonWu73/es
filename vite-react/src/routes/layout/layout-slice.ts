import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Notification {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface LayoutState {
  notification: Notification | null;
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    notification: null
  } as LayoutState,
  reducers: {
    setNotification: (state, action: PayloadAction<Notification | null>) => {
      state.notification = action.payload;
    }
  }
});

export const layoutReducer = layoutSlice.reducer;

export const {setNotification} = layoutSlice.actions;
