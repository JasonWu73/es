import classes from './Post.module.scss';
import Card from '../../../../shared/components/card/Card';
import {useParams} from 'react-router-dom';

export default function Post() {
  const {id} = useParams();
  return (
    <Card>
      <div className={classes.post}>
        <h2>{id} - Post</h2>
      </div>
    </Card>
  );
}
