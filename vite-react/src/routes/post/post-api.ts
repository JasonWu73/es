import {AxiosRequest} from '../../hooks/use-http';

export interface Post {
  id?: number;
  userId: number;
  tags: string[];
  title: string;
  body: string;
}

const BASE_URL = 'https://dummyjson.com';

export function getPostsApi(pageNumber: number, pageSize: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts`,
    params: {
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize
    }
  };
}

export function getPostApi(postId: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts/${postId}`
  };
}

export function addPostApi(post: Post): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/posts/add`,
    data: post
  };
}

export function updatePostApi(post: Post): AxiosRequest {
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
