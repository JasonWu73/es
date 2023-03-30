import React, { useState } from 'react';
import './App.scss';
import PostFetcher from './components/post-fetcher/PostFetcher';
import PostList from './components/post/PostList';
import axios from 'axios';
import { Post } from './model/Post';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handlePostFetch() {
    setIsLoading(true);
    getPosts().then(posts => {
      setPosts(posts);
      setIsLoading(false);
    });
  }

  const postsContent = isLoading ?
    <p>Loading...</p> :
    (posts.length > 0 ? <PostList posts={posts}/> : <p>Found no posts.</p>);

  return (
    <div className="app">
      <PostFetcher onFetch={handlePostFetch}/>
      {postsContent}
    </div>
  );
}

async function getPosts() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
}
