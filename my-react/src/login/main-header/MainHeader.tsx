import styles from './MainHeader.module.scss';
import { MouseEvent } from 'react';

interface Props {
  isLoggedIn: boolean,
  onLogout: () => void
}

export default function MainHeader({ isLoggedIn, onLogout }: Props) {
  const logoutHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <header className={styles.header}>
      <h1>Login Demo</h1>
      {isLoggedIn && <a href="#" onClick={logoutHandler}>Logout</a>}
    </header>
  );
}
