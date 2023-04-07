import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './routes/auth/auth-slice';
import {counterReducer} from './routes/counter/counter-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
