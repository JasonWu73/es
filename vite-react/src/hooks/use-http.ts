import {useCallback, useState} from "react";
import axios, {AxiosError} from "axios";

interface Request {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    params?: object;
}

export function useHttp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendRequest = useCallback(async (
        {method, url, params}: Request,
        applyData: (data: any) => void
    ) => {
        setLoading(true);
        setError('');
        try {
            const {data} = await axios({method, url, params});
            applyData(data);
        } catch (err) {
            setError((err as AxiosError).message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, error, sendRequest};
}
