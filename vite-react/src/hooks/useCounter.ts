import { useEffect, useState } from 'react';

export function useCounter(forward = true) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (forward) {
        setCounter(prevCounter => prevCounter + 1);
      } else {
        setCounter(prevCounter => prevCounter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return counter;
}
