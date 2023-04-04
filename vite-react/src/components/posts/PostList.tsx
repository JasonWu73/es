import classes from './PostList.module.scss';
import {Post} from "../../model/post";

interface Props {
  posts: Post[];
}

export default function PostList({posts}: Props) {
  const items = posts.map(post => <li key={post.id}>{post.id}. {post.title}</li>);
  return (
    <ul className={classes.posts}>
      {items}
    </ul>
  );
}
