import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostState {
  posts: Post[]
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: []
  } as PostState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id === action.payload);
    }
  }
});

export const postReducer = postSlice.reducer;

export const {addPost, removePost} = postSlice.actions;
