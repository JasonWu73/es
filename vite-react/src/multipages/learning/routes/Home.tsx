import Card from '../../../components/card/Card';
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <Card
      style={{
        maxWidth: '70rem',
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <h1>My Home Page</h1>
      <p>Go to <Link to="/products">the list of products.</Link></p>
    </Card>
  );
}
