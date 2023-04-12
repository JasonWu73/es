import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './routes/auth/auth-slice';
import {counterReducer} from './routes/counter/counter-slice';
import {postReducer} from './routes/post/post-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    post: postReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
