import {AxiosRequest} from '../../hooks/use-http';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function getPosts(): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}`
  };
}

export function getPost(postId: number): AxiosRequest {
  return {
    method: 'get',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
  };
}

export function addPost(): AxiosRequest {
  return {
    method: 'post',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}`
  };
}

export function deletePost(postId: number): AxiosRequest {
  return {
    method: 'delete',
    url: `${BASE_URL}/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
  };
}
