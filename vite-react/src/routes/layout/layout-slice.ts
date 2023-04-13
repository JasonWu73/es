import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LayoutState {
  error: string;
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: ''
  } as LayoutState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export const layoutReducer = layoutSlice.reducer;

export const {setError} = layoutSlice.actions;
