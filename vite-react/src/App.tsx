import React from 'react';
import './App.scss';
import PostFetcher from './components/post-fetcher/PostFetcher';
import PostList from './components/post/PostList';

export default function App() {
  return (
    <div className="app">
      <PostFetcher/>
      <PostList/>
    </div>
  );
}
