import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect, useState} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {Alert, Table} from 'antd';
import {Link} from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const columns = [
  {
    title: '文章 ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '内容',
    dataIndex: 'body',
    key: 'body'
  },
  {
    title: '用户 ID',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, post: Post) => {
      return <Link to={`/posts/${post.id}`}>详情</Link>;
    }
  }
];

export default function PostList() {
  usePageTitle('所有文章');

  const {posts, loading, error} = usePosts();

  return (
    <>
      {
        error &&
        <Alert
          type="error"
          message="获取文章列表失败"
          description={error}
          showIcon
          closable
        />
      }
      {
        !error &&
        <Table
          columns={columns}
          rowKey="id"
          dataSource={posts}
          loading={loading}
        />

      }
    </>
  );
}

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const {loading, error, sendRequest} = useHttp();

  useEffect(
    () => {
      const controller = new AbortController();

      // noinspection JSIgnoredPromiseFromCall
      sendRequest(
        {
          signal: controller.signal,
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.5 ? '' : 'error'}`
        },
        setPosts
      );

      return () => controller.abort();
    },
    [sendRequest]
  );

  return {posts, loading, error, sendRequest};
}
