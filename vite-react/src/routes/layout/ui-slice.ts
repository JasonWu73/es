import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiAxios} from '../../utils/http';
import {AxiosError} from 'axios';
import {AxiosRequest, extendHeader} from '../../hooks/use-http';
import {AppDispatch} from '../../store';
import {getInternalApiBaseUrl} from '../../config';
import {logout} from '../auth/auth-slice';

export interface LayoutState {
  loading: boolean;
  error: string;
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    error: ''
  } as LayoutState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export const uiReducer = uiSlice.reducer;

export const {setLoading, setError} = uiSlice.actions;

export function sendRequest(
  {method, url, headers, params, data}: AxiosRequest,
  applyData?: (data: any) => void
) {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(''));

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
        dispatch(logout());
        return;
      }

      const errorData: any = axiosError.response?.data;

      if (errorData && Object.keys(errorData).length > 0) {
        const errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
        dispatch(setError(errorMessage));
        return;
      }

      dispatch(setError(axiosError.message));
    }).finally(() => {
      if (!controller.signal.aborted) {
        dispatch(setLoading(false));
        return;
      }

      setTimeout(
        () => {
          dispatch(setLoading(false));
        },
        1000
      );
    });

    // controller.abort();
    return controller;
  };
}
