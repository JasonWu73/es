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

export function updateAccessTokenApi(refreshToken: string): AxiosRequest {
  return {
    method: 'post',
    url: `${getInternalApiBaseUrl()}/api/v1/token/${refreshToken}`
  };
}

export function isAuthApi(url: string) {
  return url.startsWith(`${getInternalApiBaseUrl()}/api/v1/token`);
}
