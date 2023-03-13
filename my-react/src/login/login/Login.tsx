import styles from './Login.module.scss';
import React, { useRef } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

function Login({ onLogin }: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();
    onLogin(username, password);
  };

  return (
    <form onSubmit={loginSubmitHandler} className={styles.login}>
      <input ref={usernameRef} type="text" placeholder="Username"/>
      <input ref={passwordRef} type="password" placeholder="Password"/>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
