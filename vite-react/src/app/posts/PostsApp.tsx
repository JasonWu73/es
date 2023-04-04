import {useHttp} from '../../hooks/use-http';
import React, {useEffect, useState} from 'react';
import {Post} from './post.model';
import Button from '../../components/button/Button';
import SimpleInput from './features/form/SimpleInput';
import Card from '../../components/card/Card';
import PostsList from './features/PostsList';

export default function PostsApp() {
  const {loading, error, sendRequest} = useHttp();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    sendRequest({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts'
    }, setPosts);
  }, []);

  function handleClick() {
    setShowInput(prevShowInput => !prevShowInput);
  }

  return (
    <div className="app">
      <Button onClick={handleClick}>Toggle Simple Input Form</Button>
      {showInput && <SimpleInput/>}
      <Card>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {!loading && !error && <PostsList posts={posts}/>}
      </Card>
    </div>
  );
}
