import './App.scss';
import {useHttp} from '../../hooks/use-http';
import React, {useEffect, useState} from 'react';
import {Post} from './post.model';
import Card from '../../components/card/Card';
import PostsList from './features/posts-list/PostsList';

export default function App() {
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
    <div className="app">
      <Card>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && <PostsList posts={posts}/>}
      </Card>
    </div>
  );
}