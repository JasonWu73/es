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
        const response = await apiAxios({method, url, data});

        if (signal && signal.aborted) return;

        applyData(response.data);
      } catch (error) {
        if (signal && signal.aborted) return;

        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {loading, error, sendRequest};
}
