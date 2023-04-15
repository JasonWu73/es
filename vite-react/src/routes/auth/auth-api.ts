import {AxiosRequest} from '../../hooks/use-http';
import {getInternalApiBaseUrl} from '../../config';

export function getAccessTokenApi(data: { username: string, password: string }): AxiosRequest {
  return {
    method: 'post',
    url: 'https://dummyjson.com/auth/login',
    data
  };

  // return {
  //   method: 'post',
  //   url: `${getInternalApiBaseUrl()}/api/v1/token`,
  //   data
  // };
}

export function refreshAccessTokenApi(refreshToken: string): AxiosRequest {
  return {
    method: 'post',
    url: 'https://dummyjson.com/auth/login',
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    },
    data: {
      password: '0lelplR',
      username: 'kminchelle'
    }
  };

  // return {
  //   method: 'post',
  //   url: `${getInternalApiBaseUrl()}/api/v1/token/${refreshToken}`
  // };
}

export function mockHttpApi(httpStatusCode: number): AxiosRequest {
  return {
    method: 'get',
    url: `https://dummyjson.com/http/${httpStatusCode}`
  };
}
