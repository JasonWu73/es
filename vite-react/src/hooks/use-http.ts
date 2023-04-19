import {useCallback, useState} from 'react';
import {apiAxios} from '../utils/http';
import {AxiosError} from 'axios';
import {getInternalApiBaseUrl} from '../config';
import {logout, tryUpdateAccessToken} from '../routes/auth/auth-slice';
import {AppDispatch, store} from '../store';
import {isAuthApi} from '../routes/auth/auth-api';

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

    tryUpdateAuth(store.dispatch, url);

    return [response.data, null];
  } catch (error) {
    const axiosError = error as AxiosError;
    if (needsLogout(store.dispatch, axiosError)) return [null, null];

    tryUpdateAuth(store.dispatch, url);

    return [null, getError(axiosError)];
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
        tryUpdateAuth(store.dispatch, url);

        applyData && applyData(response.data);
      }).catch(error => {
        if (controller.signal.aborted) return;

        const axiosError = error as AxiosError;
        if (needsLogout(store.dispatch, axiosError)) return;

        tryUpdateAuth(store.dispatch, url);

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
  if (!url.startsWith(getInternalApiBaseUrl())) return headers;

  const accessToken = store.getState().auth.accessToken;
  if (!accessToken) return headers;

  if (headers) {
    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return {Authorization: `Bearer ${accessToken}`};
}

export function needsLogout(dispatch: AppDispatch, error: AxiosError) {
  const isUnauthorizedError = error.response?.status === 401;
  const isApiRequest = error.request.responseURL.startsWith(getInternalApiBaseUrl());

  if (isUnauthorizedError && isApiRequest) {
    dispatch(logout());
    return true;
  }

  return false;
}

export function tryUpdateAuth(dispatch: AppDispatch, url: string) {
  if (!isAuthApi(url)) {
    dispatch(tryUpdateAccessToken());
  }
}

export function getError(error: AxiosError) {
  const errorData: any = error.response?.data;

  if (errorData && Object.keys(errorData).length > 0) {
    return errorData.error || errorData.message || JSON.stringify(errorData);
  }

  return error.message;
}
