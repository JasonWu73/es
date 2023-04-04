import classes from './PostsList.module.scss';
import {Post} from "../../post.model";

interface Props {
  posts: Post[];
}

export default function PostsList({posts}: Props) {
  const items = posts.map(post => <li key={post.id}>{post.id}. {post.title}</li>);
  return (
    <ul className={classes.posts}>
      {items}
    </ul>
  );
}
