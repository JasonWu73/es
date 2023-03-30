import classes from './PostList.module.scss';
import { Post } from '../../model/Post';

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
  return (
    <li>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  );
}
