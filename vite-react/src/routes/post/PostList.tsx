import {usePageTitle} from '../../shared/hooks/use-page-title';
import {useEffect, useState} from 'react';
import {useHttp} from '../../shared/hooks/use-http';
import {Alert, Space, Table, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {initPosts, Post} from './post-slice';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {ColumnsType} from 'antd/es/table';

const columns: ColumnsType<Post> = [
  {
    title: '文章 ID',
    dataIndex: 'id',
    key: 'id',
    width: '5%'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: '30%'
  },
  {
    title: '内容',
    dataIndex: 'body',
    key: 'body',
    width: '50%'
  },
  {
    title: '用户 ID',
    dataIndex: 'userId',
    key: 'userId',
    width: '5%'
  },
  {
    title: '操作',
    key: 'action',
    width: '10%',
    render: (_: any, post: Post) => {
      return (
        <Space>
          <Link to={`/posts/${post.id}`}>详情</Link>
          <Typography.Link onClick={() => handleDeleteClick(post.id)}>删除</Typography.Link>
        </Space>
      );
    }
  }
];

export default function PostList() {
  usePageTitle('所有文章');

  const {posts, loading, error} = usePosts();

  return (
    <>
      {error && <Alert type="error" message={error} showIcon/>}
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
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (cachedPosts.length > 0) {
        setPosts(cachedPosts);
        return;
      }

      const controller = new AbortController();

      void sendRequest(
        {
          signal: controller.signal,
          method: 'get',
          url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.2 ? '' : 'error'}`
        },
        applyPosts
      );

      return () => controller.abort();
    },
    []
  );

  function applyPosts(posts: Post[]) {
    setPosts(posts);
    dispatch(initPosts({posts}));
  }

  return {posts, loading, error};
}

function handleDeleteClick(postId: number) {
  console.log('delete: ', postId);
}
