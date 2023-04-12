import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {useErrorNotification} from '../layout/use-layout';
import {Button, Popconfirm, Space, Table, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {deletePost, Post, replacePosts} from './post-slice';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import Column from 'antd/es/table/Column';

export default function PostList() {
  usePageTitle('所有文章');

  const {loading, error, sendRequest} = useHttp();

  useErrorNotification(error);

  const {posts} = useAppSelector(state => state.post);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (posts.length > 0) return;

      const controller = new AbortController();

      getPosts(controller.signal);

      return () => {
        controller.abort();
        applyPosts([]);
      }
    },
    []
  );

  function getPosts(signal?: AbortSignal) {
    sendRequest(
      {
        signal,
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}`
      },
      applyPosts
    ).then();
  }

  function applyPosts(posts: Post[]) {
    dispatch(replacePosts({posts}));
  }

  function handleDeleteClick(postId: number) {
    sendRequest(
      {
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
      },
      () => dispatch(deletePost(postId))
    ).then();
  }

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Button type="primary" onClick={() => getPosts()}>刷新列表</Button>
      <Table rowKey="id" dataSource={posts} loading={loading}>
        <Column title="文章 ID" dataIndex="id" key="id" width="5%"/>
        <Column title="标题" dataIndex="title" key="title" width="30%"/>
        <Column title="内容" dataIndex="body" key="body" width="50%"/>
        <Column title="用户 ID" dataIndex="userId" key="userId" width="5%"/>
        <Column
          title="操作"
          key="action"
          width="10%"
          render={(_: any, post: Post) => {
            return (
              <Space>
                <Link to={`/posts/${post.id}`}>详情</Link>
                <Popconfirm
                  title="删除文章"
                  description="您确定要删除此文章吗？"
                  onConfirm={() => handleDeleteClick(post.id)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Typography.Link>删除</Typography.Link>
                </Popconfirm>
              </Space>
            );
          }}
        />
      </Table>
    </Space>
  );
}
