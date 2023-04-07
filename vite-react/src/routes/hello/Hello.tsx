import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function Hello() {
  usePageTitle('Hello');

  return (
    <Card>
      <h2>Hello Page</h2>
    </Card>
  );
}
