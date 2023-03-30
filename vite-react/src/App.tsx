import React, { useState } from 'react';
import './App.scss';
import PostFetcher from './components/post-fetcher/PostFetcher';
import PostList from './components/post/PostList';
import axios, { AxiosError } from 'axios';
import { Post } from './model/post';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handlePostFetch() {
    setIsLoading(true);
    getPosts()
      .then(([posts, err]) => {
        setIsLoading(false);
        if (posts !== null) {
          setPosts(posts);
          return;
        }
        setErrorMsg(err);
      });
  }

  let postsContent = isLoading ?
    <p>Loading...</p> :
    (
      posts.length > 0 ?
        <PostList posts={posts}/> :
        (errorMsg ? <p>{errorMsg}</p> : <p>Found no posts.</p>)
    );

  return (
    <div className="app">
      <PostFetcher onFetch={handlePostFetch}/>
      {postsContent}
    </div>
  );
}

async function getPosts(): Promise<[Post[] | null, string | null]> {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts1');
    return [data, null];
  } catch (err) {
    return [null, (err as AxiosError).message];
  }
}
