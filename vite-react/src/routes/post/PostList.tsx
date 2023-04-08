import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function PostList() {
  usePageTitle('所有文章');

  return (
    <Card>
      <h2>所有文章</h2>
    </Card>
  );
}
