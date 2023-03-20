import { MouseEvent } from 'react';
import { useAuth } from '../AuthContext';

export default function Navigation() {
  const { loggedIn, logout } = useAuth();

  function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    logout();
  }

  return (
    <>
      {loggedIn && <a href="#" onClick={handleLogout}>Logout</a>}
    </>
  );
}
