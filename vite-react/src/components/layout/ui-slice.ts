import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiAxios} from '../../utils/http';
import {AxiosError} from 'axios';
import {AxiosRequest, extendHeader, getError, needsLogout, tryUpdateAuth} from '../../hooks/use-http';
import {AppDispatch} from '../../store';

interface UiState {
  loading: boolean;
  error: string;
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    error: ''
  } as UiState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetUiSlice(state) {
      state.loading = false;
      state.error = '';
    }
  }
});

export const uiReducer = uiSlice.reducer;

export const {setLoading, setError, resetUiSlice} = uiSlice.actions;

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
      tryUpdateAuth(dispatch, url);

      applyData && applyData(response.data);
    }).catch(error => {
      if (controller.signal.aborted) return;

      const axiosError = error as AxiosError;
      if (needsLogout(dispatch, axiosError)) return;

      tryUpdateAuth(dispatch, url);

      dispatch(setError(getError(error)));
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
