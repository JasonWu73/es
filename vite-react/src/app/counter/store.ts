import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counter-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: PostsState}
export type AppDispatch = typeof store.dispatch;
