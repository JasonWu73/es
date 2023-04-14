import {AxiosRequest} from '../../hooks/use-http';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function getPostsApi(): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}`
  };
}

export function getPostApi(postId: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
  };
}

export function addPostApi(
  post: {
    title: string;
    body: string;
    userId: number;
  }
): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}`,
    data: post
  };
}

export function deletePostApi(postId: number): AxiosRequest {
  return {
    method: 'delete',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
  };
}
