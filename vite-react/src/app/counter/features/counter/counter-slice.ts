import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
  value: number;
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  } as CounterState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
});

export default counterSlice.reducer;

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions;
