import { MouseEvent } from 'react';

interface Props {
  loggedIn: boolean,
  onLogout: () => void
}

export default function Navigation({ loggedIn, onLogout }: Props) {
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
