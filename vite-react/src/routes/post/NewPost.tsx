import {usePageTitle} from '../../shared/hooks/use-page-title';
import {Alert, Button, Form, Input} from 'antd';
import {useHttp} from '../../shared/hooks/use-http';
import TextArea from 'antd/es/input/TextArea';
import {useAppSelector} from '../../store-hooks';
import {Post} from './PostList';

export default function NewPost() {
  usePageTitle('新增文章');

  const {loading, error, sendRequest} = useHttp();

  const userId = useAppSelector(state => state.auth.userId);

  function handleFormFinish(
    {
      title,
      body
    }: {
      title: string,
      body: string
    }
  ) {
    const newPost = {
      title: title.trim(),
      body: body.trim(),
      userId
    };

    void sendRequest(
      {
        method: 'post',
        url: `https://jsonplaceholder.typicode.com/posts${Math.random() > 0.5 ? '' : 'error'}`,
        data: newPost
      },
      applyAddedPost
    )
  }

  function applyAddedPost(post: Post) {
    console.log(post);
  }

  return (
    <Form
      name="new-post"
      labelCol={{span: 4}}
      wrapperCol={{span: 16}}
      onFinish={handleFormFinish}
      autoComplete="off"
    >
      {
        error &&
        <Form.Item wrapperCol={{span: 16, offset: 4}}>
          <Alert type="error" message={error} showIcon/>
        </Form.Item>
      }

      <Form.Item
        label="标题"
        name="title"
        rules={[{required: true, whitespace: true, message: '标题不能为空'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="内容"
        name="body"
        rules={[{required: true, whitespace: true, message: '内容不能为空'}]}
      >
        <TextArea rows={4}/>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 4}}>
        <Button type="primary" loading={loading} htmlType="submit">
          新增
        </Button>
      </Form.Item>
    </Form>
  );
}
