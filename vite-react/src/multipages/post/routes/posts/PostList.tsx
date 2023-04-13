import classes from './PostList.module.scss';
import {Post} from "./post.model";
import {useHttp} from '../../../../hooks/use-http';
import {useEffect, useState} from 'react';
import {usePageTitle} from '../../../../hooks/use-page-title';

interface Props {
  posts: Post[];
}

export default function PostList() {
  usePageTitle('Post List');

  const {posts, loading, error} = usePosts();

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && <Posts posts={posts}/>}
    </>
  );
}

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const {loading, error, sendRequest} = useHttp();

  useEffect(
    () => {
      sendRequest({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts'
      }, setPosts);
    },
    []
  );

  return {posts, loading, error};
}

function Posts({posts}: Props) {
  const items = posts.map(post => <li key={post.id}>{post.id}. {post.title}</li>);
  return (
    <ul className={classes.posts}>
      {items}
    </ul>
  );
}
