import {ChangeEvent, useState} from 'react';
import {Outlet, useSearchParams} from 'react-router-dom';
import Card from '../../../../components/card/Card';
import Nav, {NavRoute} from '../../../../components/nav/Nav';
import {PostOutletContext} from './post.model';

const ROUTES = [
  {
    to: "/posts/new",
    name: "New Post"
  },
  {
    to: "/posts/1",
    name: "Post 1"
  },
  {
    to: "/posts/2",
    name: "Post 2"
  }
] as NavRoute[];

export default function PostLayout() {
  const [searchParams, setSearchParams] = useSearchParams({id: '3'});
  const postId = +searchParams.get('id')!;
  const [routes, setRoutes] = useState(() => [...ROUTES, getNewPost(postId)]);

  function handlePostIdChange(event: ChangeEvent<HTMLInputElement>) {
    const postId = +event.target.value;
    if (postId < 3) {
      setSearchParams({id: '3'});
      return;
    }

    setSearchParams({id: postId + ''});
    setRoutes([
      ...ROUTES,
      getNewPost(postId)
    ]);
  }

  return (
    <Card>
      <Nav routes={routes}/>

      <input
        type="number"
        min={3}
        value={postId}
        onChange={handlePostIdChange}
        placeholder="Please enter post ID to search..."
        style={{
          padding: '1rem',
          border: '0.1rem solid #ccc',
          borderRadius: '0.8rem',
          width: '50%'
        }}
      />

      {/* `Outlet` 类似 `props.children` + `context` */}
      <Outlet context={
        {
          hello: "I'm from context from `outlet` Component."
        } as PostOutletContext
      }/>
    </Card>
  );
}

function getNewPost(postId: number) {
  return {
    to: `/posts/${postId}`,
    name: `Post ${postId}`
  };
}
