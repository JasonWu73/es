import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function Home() {
  usePageTitle('Home');

  return (
    <Card>
      <h2>Home Page</h2>
    </Card>
  );
}
