import classes from './AuthStatus.module.scss';
import {useAuth} from './AuthProvider';
import {useNavigate} from 'react-router-dom';
import Button from '../../../../components/button/Button';
import {useState} from 'react';

export default function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  if (!auth.username) {
    return <p className={classes.warn}>You are not logged in.</p>
  }

  function handleLogoutClick() {
    if (pending) {
      return;
    }

    console.log('logout...');
    setPending(true);
    auth.logout(() => {
      setPending(false);
      navigate('/');
    });
  }

  return (
    <p className={classes.auth}>
      Welcome {auth.username}!{' '}
      <Button onClick={handleLogoutClick}>
        Logout{pending ? '...' : ''}
      </Button>
    </p>
  );
}
