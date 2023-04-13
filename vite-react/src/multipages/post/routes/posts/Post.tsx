import classes from './Post.module.scss';
import {usePageTitle} from '../../../../hooks/use-page-title';
import {useOutletContext, useParams} from 'react-router-dom';
import {PostOutletContext} from './post.model';

export default function Post() {
  const {id} = useParams();
  const {hello} = useOutletContext<PostOutletContext>();

  usePageTitle(`Post ${id}`);

  return (
    <div className={classes.post}>
      <h2>{id} - Post</h2>
      <p>Data from <code>Outlet</code> context: {hello}</p>
    </div>
  );
}
