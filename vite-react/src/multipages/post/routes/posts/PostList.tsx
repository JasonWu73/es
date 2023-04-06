import classes from './PostList.module.scss';
import {Post} from "../../post.model";
import {useHttp} from '../../../../shared/hooks/use-http';
import {useEffect, useState} from 'react';
import Card from '../../../../shared/components/card/Card';
import {Link} from 'react-router-dom';

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
    <Card>
      <h2>Post List</h2>
      <ul style={{listStyle: 'none'}}>
        <li><Link to="/posts/1">Post 1</Link></li>
        <li><Link to="/posts/2">Post 2</Link></li>
      </ul>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && <Posts posts={posts}/>}
    </Card>
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
