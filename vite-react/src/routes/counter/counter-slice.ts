import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';
import {wait} from '../../shared/utils/promisify';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

export const counterReducer = counterSlice.reducer;

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export function incrementAsync(amount: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await wait(1);
    dispatch(incrementByAmount(amount));
    console.log('getState: ', getState());
  };
}
