import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';
import {store} from '../store';
import {logout} from '../routes/auth/auth-slice';
import {getInternalApiBaseUrl} from '../config';

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

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    logoutWhenUnauthorized(error);
    return Promise.reject(error);
  }
);

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
