import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import PostFetcher from './components/post-fetcher/PostFetcher';
import PostList from './components/post/PostList';
import axios, { AxiosError } from 'axios';
import { AddedPost, Post } from './model/post';
import AddPost from './components/post-form/AddPost';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePostFetch = useCallback(() => {
    setIsLoading(true);
    setErrorMsg(null);
    getPosts()
      .then(([posts, err]) => {
        setIsLoading(false);
        if (posts) {
          setPosts(posts);
          return;
        }
        setErrorMsg(err);
      });
  }, []);

  useFetchPost(handlePostFetch);

  let postsContent = isLoading ?
    <p>Loading...</p> :
    (
      errorMsg ?
        <p>{errorMsg}</p> :
        (
          posts.length === 0 ?
            <p>Found no posts.</p> :
            <PostList posts={posts}/>
        )
    );

  function handleAddPost(addedPost: AddedPost) {
    savePost(addedPost)
      .then(([post, err]) => {
        if (post) {
          setPosts(prevPosts => {
            return [post, ...prevPosts];
          });
          return;
        }
        alert(err);
      });
  }

  return (
    <div className="app">
      <AddPost onAdd={handleAddPost}/>
      <PostFetcher onFetch={handlePostFetch}/>
      {postsContent}
    </div>
  );
}

async function savePost(addedPost: AddedPost): Promise<[Post | null, string | null]> {
  try {
    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      addedPost
    );
    return [data, null];
  } catch (err) {
    return [null, (err as AxiosError).message];
  }
}

async function getPosts(): Promise<[Post[] | null, string | null]> {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.5 ? '' : '1'}`
    );
    return [data, null];
  } catch (err) {
    return [null, (err as AxiosError).message];
  }
}

function useFetchPost(handlePostFetch: () => void) {
  useEffect(() => {
    handlePostFetch();
  }, [handlePostFetch]);
}
