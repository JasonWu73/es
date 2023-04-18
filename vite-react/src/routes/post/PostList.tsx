import {usePageTitle} from '../../hooks/use-page-title';
import {useEffect} from 'react';
import {Button, Popconfirm, Space, Table, TablePaginationConfig, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {deletePostRequest, getPostsRequest, reset} from './post-slice';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import Column from 'antd/es/table/Column';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import PostTags from './PostTags';
import {Post} from './post-api';

export default function PostList() {
  usePageTitle('所有文章');
  const loading = useAppSelector(state => state.ui.loading);
  const total = useAppSelector(state => state.post.total);
  const pageNumber = useAppSelector(state => state.post.pageNumber);
  const pageSize = useAppSelector(state => state.post.pageSize);
  const posts = useAppSelector(state => state.post.posts);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      const controller = dispatch(getPostsRequest(pageNumber, pageSize));

      return () => {
        controller.abort();
        dispatch(reset());
      };
    },
    []
  );

  function handleTableChange(pagination: TablePaginationConfig) {
    dispatch(getPostsRequest(
      pagination.current!,
      pagination.pageSize!
    ));
  }

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Button
        type="primary"
        onClick={() => dispatch(getPostsRequest(pageNumber, pageSize))}
      >
        刷新列表
      </Button>

      <Table
        rowKey="id"
        dataSource={posts}
        loading={loading}
        pagination={{
          total: total,
          current: pageNumber,
          pageSize: pageSize
        }}
        onChange={handleTableChange}
      >
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
                  onConfirm={() => dispatch(deletePostRequest(post.id!))}
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
