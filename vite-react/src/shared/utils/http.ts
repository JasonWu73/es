import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';
import store from '../../store';
import {logout} from '../../routes/auth/auth-slice';

// @ts-ignore
const innerApiBaseUrl = window?._CONFIG?.baseUrl || window.location.origin;
// const innerApiBaseUrl = 'https://jsonplaceholder.typicode.com';

export const myAxios = axios.create({
  timeout: 10_000
});

myAxios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

myAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
  {
    runWhen: onGetCallInnerApi // `runWhen` 仅对请求拦截器生效
  }
);

myAxios.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();

    const axiosError = error as AxiosError;
    const isUnauthorizedError = axiosError.response!.status === 401;
    const isApiRequest = axiosError.request.responseURL.startsWith(innerApiBaseUrl);

    if (isUnauthorizedError && isApiRequest) {
      store.dispatch(logout(() => {
        console.log('Logout when 401 HTTP status code');
      }));
    }

    return Promise.reject(error);
  }
);

function onGetCallInnerApi(config: InternalAxiosRequestConfig) {
  return config.url!.startsWith(innerApiBaseUrl);
}
