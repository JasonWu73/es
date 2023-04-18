import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../store';
import {addPostApi, deletePostApi, getPostApi, getPostsApi, Post} from './post-api';
import {resetUiSlice, sendRequest} from '../../components/layout/ui-slice';

export interface PostState {
  total: number;
  pageNumber: number;
  pageSize: number;
  posts: Post[];
  post?: Post | null;
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    total: 0,
    pageNumber: 1,
    pageSize: 10,
    posts: [],
    post: null
  } as PostState,
  reducers: {
    replacePosts(state, action: PayloadAction<PostState>) {
      state.total = action.payload.total;
      state.pageNumber = action.payload.pageNumber;
      state.pageSize = action.payload.pageSize;
      state.posts = action.payload.posts;
    },
    replacePost(state, action: PayloadAction<Post>) {
      state.post = action.payload;
    },
    resetPostSlice(state) {
      state.total = 0;
      state.pageNumber = 1;
      state.pageSize = 10;
      state.posts = [];
      state.post = null;
    }
  }
});

export const postReducer = postSlice.reducer;

export const {replacePosts, replacePost, resetPostSlice} = postSlice.actions;

export function reset() {
  return (dispatch: AppDispatch) => {
    dispatch(resetPostSlice());
    dispatch(resetUiSlice());
  };
}

export function getPostsRequest(pageNumber: number, pageSize: number) {
  return (dispatch: AppDispatch) => {
    return dispatch(sendRequest(
      getPostsApi(pageNumber, pageSize),
      data => dispatch(replacePosts({
        total: data.total,
        pageNumber: pageNumber,
        pageSize: pageSize,
        posts: data.posts
      }))
    ));
  };
}

export function getPostRequest(postId: number) {
  return (dispatch: AppDispatch) => {
    return dispatch(sendRequest(
      getPostApi(postId),
      data => dispatch(replacePost(data))
    ));
  };
}

export function addPostRequest(post: Post, callback?: () => void) {
  return (dispatch: AppDispatch) => {
    dispatch(sendRequest(
      addPostApi(post),
      () => callback && callback()
    ));
  };
}

export function deletePostRequest(postId: number) {
  return (dispatch: AppDispatch) => {
    dispatch(sendRequest(deletePostApi(postId)));
  };
}
