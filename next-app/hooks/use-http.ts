import { useCallback, useState } from 'react';
import { apiAxios } from '@/utils/http';
import { AxiosError } from 'axios';

export interface AxiosRequest {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  headers?: object;
  params?: object;
  data?: object;
}

export async function sendRequest(
  { method, url, headers, params, data }: AxiosRequest,
): Promise<[data: any, error: string | null]> {
  try {
    const response = await apiAxios({
      method,
      url,
      headers,
      params,
      data,
    });

    return [response.data, null];
  } catch (error) {
    const axiosError = error as AxiosError;

    return [null, getError(axiosError)];
  }
}

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    (
      { method, url, headers, params, data }: AxiosRequest,
      applyData?: (data: any) => void,
    ) => {
      setLoading(true);
      setError('');

      const controller = new AbortController();

      apiAxios({
        signal: controller.signal,
        method,
        url,
        headers,
        params,
        data,
      }).then(response => {
        applyData && applyData(response.data);
      }).catch(error => {
        if (controller.signal.aborted) return;

        const axiosError = error as AxiosError;
        setError(getError(axiosError));
      }).finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          return;
        }

        setTimeout(
          () => {
            setLoading(false);
          },
          1000,
        );
      });

      // controller.abort();
      return controller;
    },
    [],
  );

  return { loading, error, sendRequest };
}

export function getError(error: AxiosError) {
  const errorData: any = error.response?.data;

  if (errorData && Object.keys(errorData).length > 0) {
    return errorData.error || errorData.message || JSON.stringify(errorData);
  }

  return error.message;
}
