import Card from '../../../../components/card/Card';
import {useLocation} from 'react-router-dom';
import {usePageTitle} from '../../../../hooks/use-page-title';

export default function Home() {
  usePageTitle('Home');

  const location = useLocation();

  const hi = location.state?.hi ?? '';
  const error = location.state?.error ?? '';

  return (
    <Card>
      <h2>Home Page</h2>
      {hi && <p>Data from <code>Link</code> / <code>NavLink</code> context: {hi}</p>}
      {error && <p>Data from <code>useNavigate()</code>: {error}</p>}
    </Card>
  );
}
