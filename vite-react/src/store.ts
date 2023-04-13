import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './features/auth/auth-slice';
import {counterReducer} from './features/counter/counter-slice';
import {postReducer} from './features/post/post-slice';
import {layoutReducer} from './routes/layout/layout-slice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    counter: counterReducer,
    post: postReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
