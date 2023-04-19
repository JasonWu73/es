import {usePageTitle} from '../../hooks/use-page-title';
import {Button, Form, Input, Select, Tag} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {addPostRequest} from './post-slice';
import {useNavigate} from 'react-router-dom';
import {getPostTagColor} from './PostTags';
import React from 'react';

export const TAGS: { label: string, value: string }[] = [
  {label: 'History', value: 'history'},
  {label: 'Fiction', value: 'fiction'},
  {label: 'Crime', value: 'crime'},
  {label: 'Magical', value: 'magical'},
  {label: 'Mystery', value: 'mystery'},
  {label: 'Love', value: 'love'},
  {label: 'Classic', value: 'classic'}
];

export default function NewPost() {
  usePageTitle('新增文章');
  const loading = useAppSelector(state => state.ui.loading);
  const userId = useAppSelector(state => state.auth.userId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleFormFinish(values: { tags: string[], title: string, body: string }) {
    const newPost = {
      userId,
      tags: values.tags,
      title: values.title.trim(),
      body: values.body.trim()
    };

    dispatch(addPostRequest(
      newPost,
      () => navigate('/posts')
    ));
  }

  return (
    <Form
      name="new-post"
      labelCol={{span: 4}}
      wrapperCol={{span: 16}}
      onFinish={handleFormFinish}
      autoComplete="off"
    >
      <Form.Item
        label="标签"
        name="tags"
        rules={[{required: true, message: '文章标签不能为空'}]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{width: '100%'}}
          placeholder="请选择文章所对应的标签"
          options={TAGS}
          tagRender={props => {
            const {label, value, closable, onClose} = props;

            return (
              <Tag
                color={getPostTagColor(value)}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                closable={closable}
                onClose={onClose}
                style={{marginRight: 3}}
              >
                {label}
              </Tag>
            );
          }}
        />
      </Form.Item>

      <Form.Item
        label="文章标题"
        name="title"
        rules={[{required: true, whitespace: true, message: '文章标题不能为空'}]}
      >
        <Input placeholder="请输入文章标题"/>
      </Form.Item>

      <Form.Item
        label="文章内容"
        name="body"
        rules={[{required: true, whitespace: true, message: '文章内容不能为空'}]}
      >
        <TextArea placeholder="请输入文章内容" rows={4}/>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 4}}>
        <Button type="primary" loading={loading} htmlType="submit">
          新增
        </Button>
      </Form.Item>
    </Form>
  );
}
