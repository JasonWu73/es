import {usePageTitle} from '../../hooks/use-page-title';
import {useEffect} from 'react';
import {Button, Popconfirm, Space, Table, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {deletePostRequest, getPostsRequest, Post} from './post-slice';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import Column from 'antd/es/table/Column';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import PostTags from './PostTags';

export default function PostList() {
  usePageTitle('所有文章');
  const loading = useAppSelector(state => state.ui.loading);
  const posts = useAppSelector(state => state.post.posts);
  const dispatch = useAppDispatch();

  let isInitial = true;

  useEffect(
    () => {
      if (!isInitial) return;

      isInitial = false;
      dispatch(getPostsRequest());
    },
    []
  );

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Button type="primary" onClick={() => dispatch(getPostsRequest())}>刷新列表</Button>

      <Table rowKey="id" dataSource={posts} loading={loading}>
        <Column title="文章 ID" dataIndex="id" key="id" width="5%"/>
        <Column title="文章标题" dataIndex="title" key="title" width="50%"/>
        <Column
          title="文章标签"
          dataIndex="tags"
          key="tags"
          width="35%"
          render={(_: any, {tags}: { tags: string[] }) => <PostTags tags={tags}/>}
        />
        <Column
          title="操作"
          key="action"
          width="10%"
          render={(_: any, post: Post) => {
            return (
              <Space>
                <Link to={`/posts/${post.id}`}><EditOutlined/></Link>

                <Popconfirm
                  title="删除文章"
                  description="您确定要删除此文章吗？"
                  onConfirm={() => dispatch(deletePostRequest(post.id))}
                  okText="确认"
                  cancelText="取消"
                >
                  <Typography.Link><DeleteOutlined/></Typography.Link>
                </Popconfirm>
              </Space>
            );
          }}
        />
      </Table>
    </Space>
  );
}
