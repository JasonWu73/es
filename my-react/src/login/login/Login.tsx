import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useReducer } from 'react';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [state, dispatch] = useReducer(loginFormReducer, {
    username: '',
    isInvalidUsername: false,
    password: '',
    isInvalidPassword: false,
    isInvalidForm: true
  });
  const { login } = useAuth();

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login(state.username, state.password);
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    const username = event.target.value.trim();
    dispatch({
      type: 'changed_username',
      nextUsername: username
    });
  }

  function handleUsernameBlur() {
    dispatch({
      type: 'checked_username'
    });
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value.trim();
    dispatch({
      type: 'changed_password',
      nextPassword: password
    });
  }

  function handlePasswordBlur() {
    dispatch({
      type: 'checked_password'
    });
  }

  return (
    <form onSubmit={handleLoginSubmit} className={styles.login}>
      <input
        value={state.username}
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
        className={state.isInvalidUsername ? styles.error : ''}
        type="text"
        placeholder="Username"
      />
      <input
        value={state.password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        className={state.isInvalidPassword ? styles.error : ''}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={state.isInvalidForm}>Login</button>
    </form>
  );
}

function loginFormReducer(state: LoginForm, action: LoginAction): LoginForm {
  // Reducer 中常用 `switch` + `throw`
  switch (action.type) {
    case 'changed_username': {
      const invalidUsername = isInvalidUsername(action.nextUsername!);
      return {
        ...state,
        username: action.nextUsername!,
        isInvalidUsername: invalidUsername,
        isInvalidForm: invalidUsername || isInvalidPassword(state.password)
      };
    }
    case 'checked_username': {
      return {
        ...state,
        isInvalidUsername: isInvalidUsername(state.username)
      };
    }
    case 'changed_password': {
      const invalidPassword = isInvalidPassword(action.nextPassword!);
      return {
        ...state,
        password: action.nextPassword!,
        isInvalidPassword: invalidPassword,
        isInvalidForm: invalidPassword || isInvalidUsername(state.username)
      };
    }
    case 'checked_password': {
      return {
        ...state,
        isInvalidPassword: state.password.length < 3
      };
    }
  }

  throw Error(`Unknown action: ${action.type}`);
}

function isInvalidUsername(username: string) {
  return username.length < 3;
}

function isInvalidPassword(password: string) {
  return password.length < 3;
}

interface LoginAction {
  type: 'changed_username' | 'checked_username' |
    'changed_password' | 'checked_password',
  nextUsername?: string, // 要更新的值以 `next` 为前缀命名
  nextPassword?: string
}

interface LoginForm {
  username: string,
  isInvalidUsername: boolean,
  password: string,
  isInvalidPassword: boolean,
  isInvalidForm: boolean
}
