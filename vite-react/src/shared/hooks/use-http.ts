import {useCallback, useState} from "react";
import {apiAxios} from '../api/http';
import {AxiosError} from 'axios';

interface Request {
  signal?: AbortSignal;
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
}

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    async (
      {signal, method, url, data}: Request,
      applyData: (data: any) => void
    ) => {
      setLoading(true);
      setError('');

      try {
        const {data: result} = await apiAxios({signal, method, url, data});
        applyData(result);
      } catch (error) {
        if (signal && signal.aborted) return;

        console.error(error);

        const axiosError = error as AxiosError;
        const errorData = axiosError.response?.data;

        if (errorData && Object.keys(errorData).length > 0) {
          setError(JSON.stringify(errorData));
          return;
        }

        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {loading, error, sendRequest};
}
