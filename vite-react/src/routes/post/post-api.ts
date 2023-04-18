import {AxiosRequest} from '../../hooks/use-http';
import {NewPost} from './post-slice';

const BASE_URL = 'https://dummyjson.com';

export function getPostsApi(): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts`
  };
}

export function getPostApi(postId: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts/${postId}`
  };
}

export function addPostApi(post: NewPost): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/posts/add`,
    data: post
  };
}

export function updatePostApi(post: {
  id: number;
  userId: number;
  tags: string[];
  title: string;
  body: string;
}): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/posts/add`,
    data: post
  };
}

export function deletePostApi(postId: number): AxiosRequest {
  return {
    method: 'delete',
    url: `${BASE_URL}/posts/${postId}`
  };
}
