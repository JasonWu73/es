import {usePageTitle} from '../../hooks/use-page-title';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Button, Empty, Space, Typography} from 'antd';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {getPostRequest} from './post-slice';
import {SkeletonLoading} from '../../components/loading/SuspenseLoading';
import PostTags from './PostTags';

export default function PostDetail() {
  const {postId} = useParams();
  usePageTitle(`文章详情 - ${postId}`);
  const loading = useAppSelector(state => state.ui.loading);
  const post = useAppSelector(state => state.post.post);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!postId || isNaN(+postId)) return <Empty/>;

  let isInitial = true;

  useEffect(
    () => {
      if (!isInitial) return;

      isInitial = false;
      dispatch(getPostRequest(+postId));
    },
    []
  );

  const postContent = post ?
    (
      <>
        <Typography.Title level={2}>{postId} - {post.title}</Typography.Title>
        <PostTags tags={post.tags}/>
        <Typography.Text>{post.body}</Typography.Text>
        <Typography.Text>用户 ID：{post.userId}</Typography.Text>
        <Button onClick={() => navigate('..')}>返回</Button>
      </>
    ) :
    <Empty/>;

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      {loading && <SkeletonLoading/>}
      {!loading && postContent}
    </Space>
  );
}
