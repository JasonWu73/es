import axios, {InternalAxiosRequestConfig} from 'axios';
import NProgress from 'nprogress';

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
  },
  {
    runWhen: onGetCall
  }
);

myAxios.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  },
  {
    runWhen: onGetCall
  }
);

function onGetCall(config: InternalAxiosRequestConfig) {
  console.log(config);
  return true;
}
