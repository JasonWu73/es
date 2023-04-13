import {internalApiBaseUrl} from '../../config';
import {AxiosRequest} from '../../hooks/use-http';

export function getAccessToken(data: { username: string, password: string }): AxiosRequest {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token`,
    data
  };
}

export function updateAccessToken(refreshToken: string): AxiosRequest {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token/${refreshToken}`
  };
}

export function isAuthApi(url: string) {
  return url.startsWith(`${internalApiBaseUrl}/api/v1/token`);
}
