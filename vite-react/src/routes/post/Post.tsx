import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useParams} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Button, Space, Typography} from 'antd';
import {useAppSelector} from '../../store-hooks';
import {Post as PostType} from './post-slice';

export default function Post() {
  const {id} = useParams();

  usePageTitle(`文章详情 - ${id}`);

  const post = usePost(+id!);

  const [countdown, setCountdown] = useCountdownTimer(5);

  function handleResetClick() {
    setCountdown(Math.floor(Math.random() * 10 + 1));
  }

  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={2}>{id} - {post?.title ?? ''}</Typography.Title>

      <section style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <Typography.Title level={3} style={{marginBottom: 0}}>{countdown}</Typography.Title>
        <Button onClick={handleResetClick}>Reset</Button>
      </section>

      <section>
        <Typography.Text>{post?.body ?? ''}</Typography.Text>
      </section>

      <section>
        <Typography.Text>用户 ID：{post?.userId ?? ''}</Typography.Text>
      </section>
    </Space>
  );
}

function usePost(postId: number) {
  const {posts: cachedPosts} = useAppSelector(state => state.post);
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(
    () => {
      const cachedPost = cachedPosts.find(post => post.id === postId);

      if (!cachedPost) return;

      setPost(cachedPost);
    },
    [postId]
  );

  return post;
}

function useCountdownTimer(countdownSeconds: number): [number, Dispatch<SetStateAction<number>>] {
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(() => {
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
  }, [countdown]);

  return [countdown, setCountdown];
}
