import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  invalidUsername: boolean,
  invalidPassword: boolean,
  setInvalidForm: Dispatch<SetStateAction<boolean>>
}

export default function useValidationForm({
                                            invalidUsername,
                                            invalidPassword,
                                            setInvalidForm
                                          }: Props): void {
  useEffect(() => {
    console.log('userValidationForm: setup');
    // debounce
    const timeout = setTimeout(() => {
      setInvalidForm(invalidUsername || invalidPassword);
    }, 500);

    return () => {
      console.log('userValidationForm: cleanup');
      clearTimeout(timeout);
    };
  }, [invalidUsername, invalidPassword]);
}
