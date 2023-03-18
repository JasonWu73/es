import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import useValidationForm from './useValidationForm';

interface Props {
  onLogin: (username: string, password: string) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);

  useValidationForm({
    username,
    password,
    setInvalidForm
  });

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value.trim();
    setUsername(username);
    setInvalidUsername(username.length < 3);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value.trim();
    setPassword(password);
    setInvalidPassword(password.length < 3);
  };

  return (
    <form onSubmit={handleLoginSubmit} className={styles.login}>
      <input
        value={username}
        onChange={handleUsernameChange}
        className={invalidUsername ? styles.error : ''}
        type="text"
        placeholder="Username"
      />
      <input
        value={password}
        onChange={handlePasswordChange}
        className={invalidPassword ? styles.error : ''}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={invalidForm}>Login</button>
    </form>
  );
}
