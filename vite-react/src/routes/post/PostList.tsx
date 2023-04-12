import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect, useState} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {Alert, Table} from 'antd';
import {Link} from 'react-router-dom';
import {Post} from './post-slice';
import {useAppSelector} from '../../store-hooks';

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
        <Alert type="error" message={error} showIcon/>
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
  const {posts: cachedPosts} = useAppSelector(state => state.post);

  if (cachedPosts.length > 0) {
    return {posts: cachedPosts, loading, error, sendRequest};
  }

  useEffect(
    () => {
      const controller = new AbortController();

      void sendRequest(
        {
          signal: controller.signal,
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.5 ? '' : 'error'}`
        },
        setPosts
      );

      return () => controller.abort();
    },
    []
  );

  return {posts, loading, error, sendRequest};
}
