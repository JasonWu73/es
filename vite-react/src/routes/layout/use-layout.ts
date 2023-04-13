import {useEffect} from 'react';
import {useAppDispatch} from '../../store-hooks';
import {setError} from './layout-slice';

export function useErrorNotification(...errors: string[]) {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const error = errors.find(error => error);

      if (!error) {
        dispatch(setError(''));
        return;
      }

      dispatch(setError(error));
    },
    [...errors]
  );
}
