import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useReducer, useRef } from 'react';
import { useAuth } from '../AuthContext';
import Input, { InputRef } from '../../shared/input/Input';

export default function Login() {
  const [state, dispatch] = useReducer(loginFormReducer, {
    username: '',
    isInvalidUsername: false,
    password: '',
    isInvalidPassword: false,
    isInvalidForm: true
  });
  const { onLogin } = useAuth();
  const usernameRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (state.isInvalidUsername) {
      usernameRef.current!.focus();
      return;
    }

    if (state.isInvalidPassword) {
      passwordRef.current!.focus();
      return;
    }

    if (state.isInvalidForm) {
      dispatch({
        type: 'checked_username'
      });
      dispatch({
        type: 'checked_password'
      });
      return;
    }

    onLogin(state.username, state.password);
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
      <Input
        ref={usernameRef}
        label="Username"
        type="text"
        isInvalid={state.isInvalidUsername}
        value={state.username}
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
      />
      <Input
        ref={passwordRef}
        label="Password"
        type="password"
        isInvalid={state.isInvalidPassword}
        value={state.password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
      />
      <button type="submit">Login</button>
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
