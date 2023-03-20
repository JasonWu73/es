import styles from './MainHeader.module.scss';
import Navigation from './Navigation';

interface Props {
  loggedIn: boolean,
  onLogout: () => void
}

export default function MainHeader({ loggedIn, onLogout }: Props) {

  return (
    <header className={styles.header}>
      <h1>Login Demo</h1>
      <Navigation loggedIn={loggedIn} onLogout={onLogout}/>
    </header>
  );
}
