import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {Popconfirm, Space, Table, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {deletePost, getPosts, Post} from './post-slice';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import Column from 'antd/es/table/Column';
import {useErrorNotification} from '../layout/use-layout';

export default function PostList() {
  usePageTitle('所有文章');

  const {loading, error, posts} = useAppSelector(state => state.post);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(getPosts());
    },
    []
  );

  const {loading: deleteLoading, error: deleteError, sendRequest: sendDeleteRequest} = useHttp();

  useErrorNotification(error, deleteError);

  function handleDeleteClick(postId: number) {
    void sendDeleteRequest(
      {
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}/${postId}`
      },
      () => dispatch(deletePost(postId))
    );
  }

  const tableContent = (
    <Table rowKey="id" dataSource={posts} loading={loading || deleteLoading}>
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
  );

  return (
    <>
      {!error && tableContent}
    </>
  );
}
