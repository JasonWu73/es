import classes from './PostList.module.scss';
import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect, useState} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {Post} from './post.model';

export default function PostList() {
  usePageTitle('所有文章');

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

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    sendRequest({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts'
    }, setPosts);
  }, [sendRequest]);

  return {posts, loading, error, sendRequest};
}

function Posts({posts}: { posts: Post[] }) {
  const items = posts.map(post => <li key={post.id}>{post.id}. {post.title}</li>);
  return (
    <ul className={classes.posts}>
      {items}
    </ul>
  );
}
