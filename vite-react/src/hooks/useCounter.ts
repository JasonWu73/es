import { Dispatch, SetStateAction, useEffect } from 'react';

export function useCounter(
  setCounter: Dispatch<SetStateAction<number>>,
  forward: 'forward' | 'backward'
) {
  useEffect(() => {
    const timer = autoCount(setCounter, forward);

    return () => {
      console.log('clear timeout: ' + timer);
      clearTimeout(timer);
    };
  }, []);
}

function autoCount(
  setCounter: Dispatch<SetStateAction<number>>,
  forward: 'forward' | 'backward'
) {
  const timer = setTimeout(() => {
    if (forward === 'forward') {
      setCounter(prevCounter => prevCounter + 1);
    } else {
      setCounter(prevCounter => prevCounter - 1);
    }
    autoCount(setCounter, forward);
  }, 1000);
  console.log('timer: ' + timer);
  return timer;
}
