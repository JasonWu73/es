import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Card from '../card/Card';
import {usePageTitle} from '../../hooks/use-page-title';

const COUNTDOWN_SECONDS = 5;

export default function NotFound() {
  usePageTitle('404 Page');

  const {countdown} = useRedirect();
  const countdownMessage = `second${countdown > 1 ? 's' : ''}`;

  return (
    <Card>
      <h2>Sorry! Not Found Page :(</h2>
      <h3>🛩️ You will return to the homepage in <code>{countdown}</code> {countdownMessage}.</h3>
    </Card>
  );
}

function useRedirect() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCountdown(prevCountdown => prevCountdown - 1);
      },
      1000
    );

    const timeout = setTimeout(
      () => {
        navigate('/', {state: {error: 'Error Not Found'}, replace: true});
      },
      COUNTDOWN_SECONDS * 1000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return {countdown};
}
