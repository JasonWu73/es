import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';
import {store} from '../store';
import {getAuthFromCache, login, logout} from '../features/auth/auth-slice';
import {internalApiBaseUrl} from '../config';
import {isAuthApi, updateAccessToken} from '../features/auth/auth-api';

export const apiAxios = axios.create({
  timeout: 10_000
});

apiAxios.interceptors.request.use(
  config => {
    NProgress.start();

    tryRefreshAccessToken(config);

    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

apiAxios.interceptors.request.use(
  config => {
    const {accessToken} = store.getState().auth;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

function onGetCallInternalApi(config: InternalAxiosRequestConfig) {
  return !!config.url && config.url.startsWith(internalApiBaseUrl);
}

function tryRefreshAccessToken(config: InternalAxiosRequestConfig) {
  if (!config.url) return;

  const authData = getAuthFromCache();

  if (!isAuthApi(config.url) && !authData) {
    store.dispatch(logout());
    return;
  }

  if (!isAuthApi(config.url) && authData) {
    const {refreshToken, expiredAt} = authData;
    const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
    const countdownSeconds = expiredAt - currentTimestampSeconds;
    const thresholdSeconds = 300;

    if (countdownSeconds <= thresholdSeconds) {
      axios(updateAccessToken(refreshToken))
        .then(response => {
          store.dispatch(login(response.data));
        })
        .catch(() => {
          store.dispatch(logout());
        })
    }
  }
}
