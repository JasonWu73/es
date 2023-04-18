import {useCallback, useState} from 'react';
import {apiAxios} from '../utils/http';
import {AxiosError} from 'axios';
import {getInternalApiBaseUrl} from '../config';
import {logout} from '../routes/auth/auth-slice';
import {store} from '../store';

export interface AxiosRequest {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  headers?: object;
  params?: object;
  data?: object;
}

export async function sendRequest(
  {method, url, headers, params, data}: AxiosRequest
): Promise<[data: any, error: string | null]> {
  try {
    const response = await apiAxios({
      method,
      url,
      headers: extendHeader(url, headers),
      params,
      data
    });
    return [response.data, null];
  } catch (error) {
    const axiosError = error as AxiosError;
    const isUnauthorizedError = axiosError.response?.status === 401;
    const isApiRequest = axiosError.request.responseURL.startsWith(getInternalApiBaseUrl());

    if (isUnauthorizedError && isApiRequest) {
      store.dispatch(logout());
      return [null, null];
    }

    const errorData: any = axiosError.response?.data;

    if (errorData && Object.keys(errorData).length > 0) {
      const errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
      return [null, errorMessage];
    }

    return [null, axiosError.message];
  }
}

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    (
      {method, url, headers, params, data}: AxiosRequest,
      applyData?: (data: any) => void
    ) => {
      setLoading(true);
      setError('');

      const controller = new AbortController();

      apiAxios({
        signal: controller.signal,
        method,
        url,
        headers: extendHeader(url, headers),
        params,
        data
      }).then(response => {
        applyData && applyData(response.data);
      }).catch(error => {
        if (controller.signal.aborted) return;

        const axiosError = error as AxiosError;
        const isUnauthorizedError = axiosError.response?.status === 401;
        const isApiRequest = axiosError.request.responseURL.startsWith(getInternalApiBaseUrl());

        if (isUnauthorizedError && isApiRequest) {
          store.dispatch(logout());
          return;
        }

        const errorData: any = axiosError.response?.data;

        if (errorData && Object.keys(errorData).length > 0) {
          setError(errorData.error || errorData.message || JSON.stringify(errorData));
          return;
        }

        setError(axiosError.message);
      }).finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          return;
        }

        setTimeout(
          () => {
            setLoading(false);
          },
          1000
        );
      });

      // controller.abort();
      return controller;
    },
    []
  );

  return {loading, error, sendRequest};
}

export function extendHeader(url: string, headers?: object) {
  if (!url.startsWith(getInternalApiBaseUrl())) {
    return headers;
  }

  const accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    return headers;
  }

  if (headers) {
    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return {Authorization: `Bearer ${accessToken}`};
}
