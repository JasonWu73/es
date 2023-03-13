import styles from './MainHeader.module.scss';
import React from 'react';

interface Props {
  isLoggedIn: boolean,
  onLogout: () => void
}

function MainHeader({ isLoggedIn, onLogout }: Props) {
  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
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

export default MainHeader;
