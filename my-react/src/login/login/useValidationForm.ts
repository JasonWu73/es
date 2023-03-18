import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  username: string,
  password: string,
  setInvalidForm: Dispatch<SetStateAction<boolean>>
}

export default function useValidationForm({
                                            username,
                                            password,
                                            setInvalidForm
                                          }: Props): void {
  useEffect(() => {
    // debounce
    const timeout = setTimeout(() => {
      setInvalidForm(username.length < 3 || password.length < 3);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [username, password]);
}
