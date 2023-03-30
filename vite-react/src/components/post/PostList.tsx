import classes from './PostList.module.scss';
import { Post } from '../../model/post';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const postItems = posts.map(post => <PostItem key={post.id} post={post}/>);
  return (
    <div className={classes.posts}>
      <ul>
        {postItems}
      </ul>
    </div>
  );
}

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  const title = `${post.id} - ${post.title}`;
  return (
    <li>
      <h2>{title}</h2>
      <p>{post.body}</p>
    </li>
  );
}
