import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Card from '../card/Card';

const COUNTDOWN_SECONDS = 5;

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
      // navigate(-1); // Is equivalent to hitting the back button
    }, COUNTDOWN_SECONDS * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const countdownMessage = `${countdown} second${countdown > 1 ? 's' : ''}`;

  return (
    <Card>
      <h2>Sorry! Not Found Page :(</h2>
      <h3>🛩️: You will return to the homepage in {countdownMessage}.</h3>
    </Card>
  );
}
