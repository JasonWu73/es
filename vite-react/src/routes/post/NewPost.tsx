import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function Post() {
  usePageTitle('新增文章');

  return (
    <Card>
      <h2>新增文章</h2>
    </Card>
  );
}
