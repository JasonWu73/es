import classes from './AuthStatus.module.scss';
import {useAuth} from './AuthProvider';
import {useNavigate} from 'react-router-dom';
import Button from '../../../../shared/components/button/Button';

export default function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.username) {
    return <p>You are not logged in.</p>
  }

  return (
    <div className={classes.auth}>
      Welcome {auth.username}!{' '}
      <Button onClick={() => auth.logout(() => navigate('/'))}>
        Logout
      </Button>
    </div>
  );
}
