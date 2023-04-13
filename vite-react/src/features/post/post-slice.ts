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
    replacePosts(state, action: PayloadAction<PostState>) {
      state.posts = action.payload.posts;
    },
    addPost(state, action: PayloadAction<Post>) {
      const newPost = {
        ...action.payload,
        id: (state.posts.at(-1)?.id ?? 0) + 1
      };
      state.posts.unshift(newPost);
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  }
});

export const postReducer = postSlice.reducer;

export const {replacePosts, addPost, deletePost} = postSlice.actions;
