import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';
import {store} from '../store';
import {login, logout} from '../routes/auth/auth-slice';
import {isAuthApi, updateAccessTokenApi} from '../routes/auth/auth-api';
import {getInternalApiBaseUrl} from '../config';

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
    const accessToken = store.getState().auth.accessToken;

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

    console.log(error);

    if (axios.isCancel(error)) return Promise.reject(error);

    const axiosError = error as AxiosError;

    logoutWhenUnauthorized(axiosError);

    return Promise.reject(error);
  }
);

function tryRefreshAccessToken(config: InternalAxiosRequestConfig) {
  if (!config.url) return;

  const refreshToken = store.getState().auth.refreshToken;
  const expiredAt = store.getState().auth.expiredAt;

  if (!isAuthApi(config.url) && (!refreshToken || !expiredAt)) {
    store.dispatch(logout());
    return;
  }

  if (!isAuthApi(config.url)) {
    const currentTimestampSeconds = Math.floor(new Date().getTime() / 1000);
    const countdownSeconds = expiredAt - currentTimestampSeconds;
    const refreshLessThanSeconds = 600;

    if (countdownSeconds <= refreshLessThanSeconds) {
      axios(updateAccessTokenApi(refreshToken)).then(response => {
        store.dispatch(login(response.data));
      }).catch(() => {
        store.dispatch(logout());
      })
    }
  }
}

function onGetCallInternalApi(config: InternalAxiosRequestConfig) {
  return !!config.url && config.url.startsWith(getInternalApiBaseUrl());
}

function logoutWhenUnauthorized(axiosError: AxiosError<unknown, any>) {
  const isUnauthorizedError = axiosError.response?.status === 401;
  const isApiRequest = axiosError.request.responseURL.startsWith(getInternalApiBaseUrl());

  if (isUnauthorizedError && isApiRequest) {
    store.dispatch(logout());
  }
}
