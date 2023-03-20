import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  isInvalidUsername: boolean,
  isInvalidPassword: boolean,
  setInvalidForm: Dispatch<SetStateAction<boolean>>
}

export default function useValidationForm(
  {
    isInvalidUsername,
    isInvalidPassword,
    setInvalidForm
  }: Props
): void {
  useEffect(() => {
    console.log('userValidationForm: setup');
    // debounce
    const timeout = setTimeout(() => {
      setInvalidForm(isInvalidUsername || isInvalidPassword);
    }, 500);

    return () => {
      console.log('userValidationForm: cleanup');
      clearTimeout(timeout);
    };
  }, [isInvalidUsername, isInvalidPassword, setInvalidForm]);
}
