import {internalApiBaseUrl} from '../../config-data';
import {AxiosRequest} from '../../hooks/use-http';

export function getAccessTokenApi(data: { username: string, password: string }): AxiosRequest {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token`,
    data
  };
}

export function updateAccessTokenApi(refreshToken: string): AxiosRequest {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token/${refreshToken}`
  };
}

export function isAuthApi(url: string) {
  return url.startsWith(`${internalApiBaseUrl}/api/v1/token`);
}
