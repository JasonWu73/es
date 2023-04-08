import Card from '../../shared/components/card/Card';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useParams} from 'react-router-dom';

export default function Post() {
  const {id} = useParams();

  usePageTitle(`文章详情 - ${id}`);

  return (
    <Card>
      <h2>文章详情 - {id}</h2>
    </Card>
  );
}
