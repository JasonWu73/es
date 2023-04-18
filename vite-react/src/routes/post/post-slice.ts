import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';
import {addPostApi, deletePostApi, getPostApi, getPostsApi, NewPost, Post} from './post-api';
import {sendRequest} from '../layout/ui-slice';

export interface PostState {
  posts: Post[];
  post: Post | null;
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    post: null
  } as PostState,
  reducers: {
    replacePosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    replacePost(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
    resetPost(state) {
      state.posts = [];
      state.post = null;
    }
  }
});

export const postReducer = postSlice.reducer;

export const {replacePosts, replacePost, resetPost} = postSlice.actions;

export function getPostsRequest() {
  return async (dispatch: AppDispatch) => {
    dispatch(sendRequest(
      getPostsApi(),
      data => dispatch(replacePosts(data.posts))
    ));
  };
}

export function getPostRequest(postId: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(sendRequest(
      getPostApi(postId),
      data => dispatch(replacePost(data))
    ));
  };
}

export function addPostRequest(post: NewPost, callback?: () => void) {
  return async (dispatch: AppDispatch) => {
    dispatch(sendRequest(
      addPostApi(post),
      () => callback && callback()
    ));
  };
}

export function deletePostRequest(postId: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(sendRequest(deletePostApi(postId)));
  };
}
