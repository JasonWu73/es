import classes from './Post.module.scss';
import {useOutletContext, useParams} from 'react-router-dom';
import {PostOutletContext} from './post.model';

export default function Post() {
  const {id} = useParams();
  const {hello} = useOutletContext<PostOutletContext>();
  return (
    <div className={classes.post}>
      <h2>{id} - Post</h2>
      <p>Data from outlet context: {hello}</p>
    </div>
  );
}
