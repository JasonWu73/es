import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';
import store from '../../store';
import {login, logout} from '../../routes/auth/auth-slice';
import {internalApiBaseUrl} from './config';
import {isAuthApi, updateAccessToken} from './auth';

export const apiAxios = axios.create({
  timeout: 10_000
});

apiAxios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

apiAxios.interceptors.request.use(
  config => {
    const {accessToken, refreshToken, expiredAt} = store.getState().auth;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (!isAuthApi(config.url!) && refreshToken) {
      const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
      const countdownSeconds = expiredAt - currentTimestampSeconds;
      const thresholdSeconds = 300;

      if (countdownSeconds <= thresholdSeconds) {
        axios(updateAccessToken(refreshToken))
          .then(response => {
            store.dispatch(login(response.data));
          })
          .catch(() => {
            store.dispatch(logout(() => {
            }));
          })
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
  {
    runWhen: onGetCallInternalApi // `runWhen` 仅对请求拦截器生效
  }
);

apiAxios.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();

    const axiosError = error as AxiosError;
    const isUnauthorizedError = axiosError.response!.status === 401;
    const isApiRequest = axiosError.request.responseURL.startsWith(internalApiBaseUrl);

    if (isUnauthorizedError && isApiRequest) {
      store.dispatch(logout(() => {
      }));
    }

    return Promise.reject(error);
  }
);

function onGetCallInternalApi(config: InternalAxiosRequestConfig) {
  return config.url!.startsWith(internalApiBaseUrl);
}
