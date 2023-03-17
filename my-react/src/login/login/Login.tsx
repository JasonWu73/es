import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);

  useEffect(() => {
    // debounce
    const timeout = setTimeout(() => {
      setInvalidForm(username.length < 3 || password.length < 3);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [username, password]);

  const loginSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value.trim();
    setUsername(username);
    setInvalidUsername(username.length < 3);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value.trim();
    setPassword(password);
    setInvalidPassword(password.length < 3);
  };

  return (
    <form onSubmit={loginSubmitHandler} className={styles.login}>
      <input
        value={username}
        onChange={usernameChangeHandler}
        className={invalidUsername ? styles.error : ''}
        type="text"
        placeholder="Username"
      />
      <input
        value={password}
        onChange={passwordChangeHandler}
        className={invalidPassword ? styles.error : ''}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={invalidForm}>Login</button>
    </form>
  );
}
