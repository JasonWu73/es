import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function Post() {
  usePageTitle('文章详情');

  return (
    <Card>
      <h2>文章详情</h2>
    </Card>
  );
}
