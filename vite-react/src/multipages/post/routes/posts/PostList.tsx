import classes from './PostList.module.scss';
import {Post} from "./post.model";
import {useHttp} from '../../../../shared/hooks/use-http';
import {useEffect, useState} from 'react';

interface Props {
  posts: Post[];
}

export default function PostList() {
  const {loading, error, sendRequest} = useHttp();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    sendRequest({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts'
    }, setPosts);
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && <Posts posts={posts}/>}
    </>
  );
}

function Posts({posts}: Props) {
  const items = posts.map(post => <li key={post.id}>{post.id}. {post.title}</li>);
  return (
    <ul className={classes.posts}>
      {items}
    </ul>
  );
}
