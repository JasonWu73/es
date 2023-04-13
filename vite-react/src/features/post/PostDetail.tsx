import {usePageTitle} from '../../hooks/use-page-title';
import {useParams} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button, Empty, Skeleton, Space, Typography} from 'antd';
import {useAppSelector} from '../../store-hooks';
import {Post} from './post-slice';
import {useHttp} from '../../hooks/use-http';
import SkeletonButton from 'antd/es/skeleton/Button';
import {useErrorNotification} from '../../routes/layout/use-layout';
import {getPostApi} from './post-api';

export default function PostDetail() {
  const {id} = useParams();

  if (!id) return <Empty/>;

  usePageTitle(`文章详情 - ${id}`);

  const {loading, error, sendRequest} = useHttp();

  useErrorNotification(error);

  const posts = useAppSelector(state => state.post.posts);
  const [post, setPost] = useState<Post>();

  useEffect(
    () => {
      const cachedPost = posts.find(post => post.id === +id);

      if (cachedPost) {
        setPost(cachedPost);
        return;
      }

      const controller = sendRequest(
        getPostApi(+id),
        setPost
      );

      return () => controller.abort();
    },
    []
  );

  const [countdown, setCountdown] = useCountdownTimer(5);

  function handleResetClick() {
    setCountdown(Math.floor(Math.random() * 10 + 1));
  }

  if (!post) return <Empty/>;

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
      <Typography.Title level={2}>{id} - {post.title ?? ''}</Typography.Title>

      <section style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <Typography.Title level={3} style={{marginBottom: 0}}>随机倒数读秒器：{countdown}</Typography.Title>
        <Button onClick={handleResetClick}>随机重置倒数</Button>
      </section>

      <section>
        <Typography.Text>{post.body ?? ''}</Typography.Text>
      </section>

      <section>
        <Typography.Text>用户 ID：{post.userId ?? ''}</Typography.Text>
      </section>
    </>
  );

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      {loading && skeletonContent}
      {!error && postContent}
    </Space>
  );
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
