import {useCallback, useState} from "react";
import {apiAxios} from '../utils/http';
import {AxiosError} from 'axios';

export interface AxiosRequest {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  params?: object;
  data?: object;
}

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    (
      {method, url, params, data}: AxiosRequest,
      applyData: (data: any) => void
    ) => {
      setLoading(true);
      setError('');

      const controller = new AbortController();

      apiAxios({
        signal: controller.signal,
        method,
        url,
        params,
        data
      }).then(response => {
        applyData(response.data);
      }).catch(error => {
        if (controller.signal.aborted) return;

        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data;

        if (errorData && Object.keys(errorData).length > 0) {
          setError(JSON.stringify(errorData));
          return;
        }

        setError(axiosError.message);
      }).finally(() => setLoading(false));

      // controller.abort();
      return controller;
    },
    []
  );

  return {loading, error, sendRequest};
}
