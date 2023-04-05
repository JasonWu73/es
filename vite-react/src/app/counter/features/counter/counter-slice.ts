import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';

// Define a type for the slice state
interface CounterState {
  value: number;
}

export const counterSlice = createSlice({
  name: 'counter', // Action type value: used as the first part of each action type
  initialState: { //  Initial state value for the reducers
    value: 0
  } as CounterState, // Workaround: cast state instead of declaring variable type
  // Rules of Reducers:
  // They should only calculate the new state value based on the state and action arguments
  // They are not allowed to modify the existing state
  // They must not do any asynchronous logic or other "side effects"
  reducers: {// Action type value: the key name of each reducer function is used as the second part
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

// Slice reducer function that knows how to respond to all these action types
// const newState = counterSlice.reducer(
//   {value: 10},
//   counterSlice.actions.increment()
// );
// console.log(newState); // {value: 11}
export default counterSlice.reducer;

// Action creators are generated for each case reducer function
// console.log(counterSlice.actions.increment()); // {type: 'counter/increment', payload: undefined}
export const {increment, decrement, incrementByAmount} = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// The outside "thunk creator" function
export function incrementAsync(amount: number) {
  // The inside "thunk function"
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await wait(1);
    dispatch(incrementByAmount(amount));
    console.log(getState()); // {counter: {value: 100}}
  };
}

function wait(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
