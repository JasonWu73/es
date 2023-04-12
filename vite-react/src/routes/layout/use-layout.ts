import {useEffect} from 'react';
import {useAppDispatch} from '../../store-hooks';
import {setNotification} from './layout-slice';

export function useErrorNotification(...errors: string[]) {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const error = errors.find(error => error);

      if (!error) {
        dispatch(setNotification(null));
        return;
      }

      dispatch(setNotification({
        type: 'error',
        message: error
      }));
    },
    [...errors]
  );
}
