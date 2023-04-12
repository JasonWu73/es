import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useParams} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Alert, Button, Skeleton, Space, Typography} from 'antd';
import {useAppSelector} from '../../store-hooks';
import {Post} from './post-slice';
import {useHttp} from '../../shared/hooks/use-http';
import SkeletonButton from 'antd/es/skeleton/Button';

export default function PostDetail() {
  const {id} = useParams();

  usePageTitle(`文章详情 - ${id}`);

  const {post, loading, error} = usePost(+id!);

  const [countdown, setCountdown] = useCountdownTimer(5);

  function handleResetClick() {
    setCountdown(Math.floor(Math.random() * 10 + 1));
  }

  const skeletonContent = (
    <>
      <Skeleton active paragraph={false}/>
      <Space>
        <SkeletonButton active/>
        <SkeletonButton active/>
      </Space>
      <Skeleton active paragraph title={false}/>
    </>
  );

  const postContent = (
    <>
      <Typography.Title level={2}>{id} - {post?.title ?? ''}</Typography.Title>

      <section style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <Typography.Title level={3} style={{marginBottom: 0}}>随机倒数读秒器：{countdown}</Typography.Title>
        <Button onClick={handleResetClick}>随机重置倒数</Button>
      </section>

      <section>
        <Typography.Text>{post?.body ?? ''}</Typography.Text>
      </section>

      <section>
        <Typography.Text>用户 ID：{post?.userId ?? ''}</Typography.Text>
      </section>
    </>
  );

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      {loading && skeletonContent}
      {error && <Alert type="error" message={error} showIcon/>}
      {!error && postContent}
    </Space>
  );
}

function usePost(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const {loading, error, sendRequest} = useHttp();
  const {posts: cachedPosts} = useAppSelector(state => state.post);

  useEffect(
    () => {
      const cachedPost = cachedPosts.find(post => post.id === postId);

      if (cachedPost) {
        setPost(cachedPost);
        return;
      }

      const controller = new AbortController();

      void sendRequest(
        {
          signal: controller.signal,
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
        },
        setPost
      );

      return () => controller.abort();
    },
    [JSON.stringify(cachedPosts), postId]
  );

  return {post, loading, error};
}

function useCountdownTimer(countdownSeconds: number): [number, Dispatch<SetStateAction<number>>] {
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(
    () => {
      const interval = setInterval(
        () => {
          setCountdown(prevCountdown => prevCountdown - 1);
        },
        1000
      );

      if (countdown === 0) {
        window.clearInterval(interval);
      }

      return () => {
        window.clearInterval(interval);
      };
    },
    [countdown]
  );

  return [countdown, setCountdown];
}
