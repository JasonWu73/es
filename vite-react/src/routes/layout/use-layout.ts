import {useEffect} from 'react';
import {useAppDispatch} from '../../store-hooks';
import {setNotification} from './layout-slice';

export function useErrorNotification(error: string) {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (error) {
        dispatch(setNotification({
          type: 'error',
          message: error
        }));
        return;
      }

      dispatch(setNotification(null));
    },
    [error]
  );
}
