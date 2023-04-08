import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';

export default function PostList() {
  usePageTitle('文章列表');

  return (
    <Card>
      <h2>文章列表</h2>
    </Card>
  );
}
