import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from './AuthProvider';
import {FormEvent, useState} from 'react';
import Button from '../../../../shared/components/button/Button';
import Card from '../../../../shared/components/card/Card';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [waiting, setWaiting] = useState(false);
  const {login} = useAuth();
  const from = location.state?.from?.pathname || '/';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;

    if (!username || waiting) {
      return;
    }

    console.log('login...');
    setWaiting(true);
    login(username, () => {
      setWaiting(false);
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, {replace: true});
    });
  }

  return (
    <Card>
      <p>You must log in to view the page at {from}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input
          name="username"
          type="text"
          placeholder="Please enter username..."
          style={{
            padding: '1rem',
            border: '0.1rem solid #ccc',
            borderRadius: '0.8rem',
            width: '50%'
          }}
        />
        </label>{" "}
        <Button>Login{waiting ? '...' : ''}</Button>
      </form>
    </Card>
  );
};
