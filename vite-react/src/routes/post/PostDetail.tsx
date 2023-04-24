import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Empty, Select, Space, Tag, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store-hooks';
import { getPostRequest, reset, updatePost, updatePostRequest } from './post-slice';
import { SkeletonLoading } from '@/components/loading/SuspenseLoading';
import { getPostTagColor } from './PostTags';
import { TAGS } from './NewPost';

export default function PostDetail() {
  const { postId } = useParams();
  const post = usePost(postId);
  usePageTitle(`文章详情 - ${post?.title || ''}`);
  const loading = useAppSelector(state => state.ui.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (loading) {
    return <SkeletonLoading />;
  }

  if (!post) {
    return <Empty />;
  }

  function handleUpdateClick() {
    if (
      !post ||
      post.tags.length === 0 ||
      post.title.trim().length === 0 ||
      post.body.trim().length === 0
    ) {
      return;
    }

    dispatch(updatePostRequest());
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Typography.Title level={2}>{postId}.</Typography.Title>
        <Typography.Title
          level={2}
          editable={{
            onChange: value => (
              value.trim().length > 0 &&
              dispatch(updatePost({ ...post, title: value.trim() }))
            )
          }}
          style={{ marginTop: 0, flexGrow: 1 }}
        >
          {post.title}
        </Typography.Title>
      </div>

      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="请选择文章所对应的标签"
        options={TAGS}
        defaultValue={post.tags}
        onChange={value => dispatch(updatePost({ ...post, tags: value }))}
        status={post.tags.length === 0 ? 'error' : ''}
        tagRender={props => {
          const { label, value, closable, onClose } = props;

          return (
            <Tag
              color={getPostTagColor(value)}
              onMouseDown={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              closable={closable}
              onClose={onClose}
              style={{ marginRight: 3 }}
            >
              {label}
            </Tag>
          );
        }}
      />
      {post.tags.length === 0 && <Typography.Text type="danger">文章标签不能为空</Typography.Text>}

      <Typography.Paragraph
        editable={{
          onChange: value => (
            value.trim().length > 0 &&
            dispatch(updatePost({ ...post, body: value.trim() }))
          )
        }}
        style={{ marginTop: '1rem' }}
      >
        {post.body}
      </Typography.Paragraph>

      <Typography.Paragraph>用户 ID：{post.userId}</Typography.Paragraph>

      <Space>
        <Button onClick={() => navigate('..')}>返回</Button>
        <Button type="primary" onClick={handleUpdateClick}>更新</Button>
      </Space>
    </Space>
  );
}

function usePost(postId: string | undefined) {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.post.post);

  React.useEffect(
    () => {
      if (!postId || isNaN(+postId)) {
        return;
      }

      const controller = dispatch(getPostRequest(+postId));

      return () => {
        controller.abort();
        dispatch(reset());
      };
    },
    []
  );

  return post;
}
