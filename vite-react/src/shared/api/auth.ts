import {internalApiBaseUrl} from './config';

export function getAccessToken(data: { username: string, password: string }) {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token`,
    data
  };
}

export function updateAccessToken(refreshToken: string) {
  return {
    method: 'post',
    url: `${internalApiBaseUrl}/api/v1/token/${refreshToken}`
  };
}

export function isAuthApi(url: string) {
  return url.startsWith(`${internalApiBaseUrl}/api/v1/token`);
}
