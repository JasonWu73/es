import axios from 'axios';
import NProgress from 'nprogress';

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

    return Promise.reject(error);
  }
);
