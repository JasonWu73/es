import classes from './AuthStatus.module.scss';
import {useAuth} from './AuthProvider';
import {useNavigate} from 'react-router-dom';
import Button from '../../../../shared/components/button/Button';
import {useState} from 'react';

export default function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  if (!auth.username) {
    return <p className={classes.warn}>You are not logged in.</p>
  }

  function handleLogoutClick() {
    if (waiting) {
      return;
    }

    console.log('logout...');
    setWaiting(true);
    auth.logout(() => {
      setWaiting(false);
      navigate('/');
    });
  }

  return (
    <p className={classes.auth}>
      Welcome {auth.username}!{' '}
      <Button onClick={handleLogoutClick}>
        Logout{waiting ? '...' : ''}
      </Button>
    </p>
  );
}
