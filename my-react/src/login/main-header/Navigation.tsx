import { MouseEvent } from 'react';
import { useAuth } from '../AuthContext';

export default function Navigation() {
  const { loggedIn, onLogout } = useAuth();

  function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onLogout();
  }

  return (
    <>
      {loggedIn && <a href="#" onClick={handleLogout}>Logout</a>}
    </>
  );
}
