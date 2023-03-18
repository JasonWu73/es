import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useReducer } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

interface LoginForm {
  username: string,
  invalidUsername: boolean,
  password: string,
  invalidPassword: boolean,
  invalidForm: boolean
}

interface LoginAction {
  type: 'changed_username' | 'checked_username' |
    'changed_password' | 'checked_password',
  nextUsername?: string, // 下一个 `state` 以 `next` 为前缀
  nextPassword?: string
}

function loginFormReducer(state: LoginForm, action: LoginAction): LoginForm {
  switch (action.type) {
    case 'changed_username': {
      return {
        ...state,
        username: action.nextUsername!
      };
    }
    case 'checked_username': {
      const invalidUsername = state.username.length < 3;
      return {
        ...state,
        invalidUsername: invalidUsername,
        invalidForm: invalidUsername || state.invalidPassword
      };
    }
    case 'changed_password': {
      return {
        ...state,
        password: action.nextPassword!
      };
    }
    case 'checked_password': {
      const invalidPassword = state.password.length < 3;
      return {
        ...state,
        invalidPassword: invalidPassword,
        invalidForm: invalidPassword || state.invalidUsername
      };
    }
  }

  throw Error(`Unknown action: ${action.type}`);
}

export default function Login({ onLogin }: Props) {
  // `state` 与 `dispatch` 因为属于组件，故可统一使用命名
  // 而 `reducer` 会放于组件外面，故需要明确命名
  const [state, dispatch] = useReducer(loginFormReducer, {
    username: '',
    invalidUsername: false,
    password: '',
    invalidPassword: false,
    invalidForm: true
  });

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      <input
        value={state.username}
        onChange={handleUsernameChange}
        onBlur={handleUsernameBlur}
        className={state.invalidUsername ? styles.error : ''}
        type="text"
        placeholder="Username"
      />
      <input
        value={state.password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        className={state.invalidPassword ? styles.error : ''}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={state.invalidForm}>Login</button>
    </form>
  );
}
