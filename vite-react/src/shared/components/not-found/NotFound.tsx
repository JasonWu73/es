import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import Card from '../card/Card';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <Card>
      <h2>Sorry! Not Found Page :(</h2>
      <h3>🛩️: You will return to the homepage in 5 seconds.</h3>
    </Card>
  );
}
