import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  isInvalidUsername: boolean,
  isInvalidPassword: boolean,
  setIsInvalidForm: Dispatch<SetStateAction<boolean>>
}

export default function useValidationForm(
  {
    isInvalidUsername,
    isInvalidPassword,
    setIsInvalidForm
  }: Props
): void {
  useEffect(() => {
    console.log('userValidationForm: setup');
    // debounce
    const timeout = setTimeout(() => {
      setIsInvalidForm(isInvalidUsername || isInvalidPassword);
    }, 500);

    return () => {
      console.log('userValidationForm: cleanup');
      clearTimeout(timeout);
    };
  }, [isInvalidUsername, isInvalidPassword, setIsInvalidForm]);
}
