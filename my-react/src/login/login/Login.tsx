import styles from './Login.module.scss';
import React, { useRef, useState } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

function Login({ onLogin }: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [ error, setError ] = useState(false);

  const getUsername = () => {
    return usernameRef.current!.value.trim();
  };

  const getPassword = () => {
    return passwordRef.current!.value.trim();
  };

  const loginSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validUsername = validateUsernameInput();
    const validPassword = validatePasswordInput();
    if (!validUsername || !validPassword) return;

    const username = getUsername();
    const password = getPassword();
    onLogin(username, password);
  };

  function validateUsernameInput() {
    const classList = usernameRef.current!.classList;
    if (getUsername().length <= 2) {
      classList.add(styles.error);
      setError(true);
      return false;
    }

    classList.remove(styles.error);
    setError(false);
    return true;
  }

  const usernameChangeHandler = () => {
    validateUsernameInput();
  };

  function validatePasswordInput() {
    const classList = passwordRef.current!.classList;
    if (getPassword().length <= 2) {
      classList.add(styles.error);
      setError(true);
      return false;
    }
    classList.remove(styles.error);
    setError(false);
    return true;
  }

  const passwordChangeHandler = () => {
    validatePasswordInput();
  };

  return (
    <form onSubmit={loginSubmitHandler} className={styles.login}>
      <input
        ref={usernameRef}
        onChange={usernameChangeHandler}
        type="text"
        placeholder="Username"
      />
      <input
        ref={passwordRef}
        onChange={passwordChangeHandler}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={error}>Login</button>
    </form>
  );
}

export default Login;
