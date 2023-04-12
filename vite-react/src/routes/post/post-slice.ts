import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../store';
import {apiAxios} from '../../shared/api/http';
import {AxiosError} from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostState {
  loading: boolean;
  error: string;
  posts: Post[];
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: '',
    posts: []
  } as PostState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const newPost = {...action.payload, id: action.payload.id + state.posts.length};
      state.posts.unshift(newPost);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  }
});

export const postReducer = postSlice.reducer;

export const {setLoading, setError, setPosts, addPost, deletePost} = postSlice.actions;

export function getPosts() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(''));

      const {data} = await apiAxios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}`
      });

      dispatch(setPosts(data));
    } catch (error) {
      const errorMessage = (error as AxiosError).message;
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
