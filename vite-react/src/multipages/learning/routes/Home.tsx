import {Link, useNavigate} from 'react-router-dom';
import {usePageTitle} from '../../../hooks/use-page-title';

export default function Home() {
  usePageTitle('Home');

  const navigate = useNavigate();

  function handleNavigateClick() {
    navigate('/products');
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>Go to <Link to="/products">the list of products.</Link></p>
      <p>
        <button onClick={handleNavigateClick}>Navigate</button>
      </p>
    </>
  );
}
