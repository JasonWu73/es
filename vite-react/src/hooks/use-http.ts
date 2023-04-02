import {useState} from "react";
import axios, {AxiosError} from "axios";

interface Request {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    params?: object;
}

export default function useHttp({method, url, params}: Request) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function sendRequest() {
        setLoading(true);
        setError('');
        try {
            const {data} = await axios({method, url, params});
            return data;
        } catch (err) {
            setError((err as AxiosError).message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, sendRequest};
}
