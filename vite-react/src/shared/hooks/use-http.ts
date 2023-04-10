import {useCallback, useState} from "react";
import {myAxios} from '../utils/http';
import {AxiosError} from 'axios';

interface Request {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: object;
}

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(
    async (
      {method, url, data}: Request,
      applyData: (data: any) => void
    ) => {
      setLoading(true);
      setError('');

      try {
        const response = await myAxios({method, url, data});
        applyData(response.data);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {loading, error, sendRequest};
}
