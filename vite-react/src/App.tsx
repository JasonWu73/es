import React, { useState } from 'react';
import './App.scss';
import PostFetcher from './components/post-fetcher/PostFetcher';
import PostList from './components/post/PostList';
import axios from 'axios';
import { Post } from './model/Post';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  function handlePostFetch() {
    getPosts().then(posts => {
      setPosts(posts);
    });
  }

  return (
    <div className="app">
      <PostFetcher onFetch={handlePostFetch}/>
      <PostList posts={posts}/>
    </div>
  );
}

async function getPosts() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
}
