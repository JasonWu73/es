import {usePageTitle} from '../../hooks/use-page-title';
import {Button, Form, Input} from 'antd';
import {useHttp} from '../../hooks/use-http';
import TextArea from 'antd/es/input/TextArea';
import {useAppDispatch, useAppSelector} from '../../store-hooks';
import {addPost} from './post-slice';
import {useNavigate} from 'react-router-dom';
import {useErrorNotification} from '../../components/layout/use-layout';
import {addPostApi} from './post-api';

export default function NewPost() {
  usePageTitle('新增文章');

  const {loading, error, sendRequest} = useHttp();

  useErrorNotification(error);

  const userId = useAppSelector(state => state.auth.userId);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  function handleFormFinish({title, body}: { title: string, body: string }) {
    const newPost = {
      title: title.trim(),
      body: body.trim(),
      userId
    };

    sendRequest(
      addPostApi(newPost),
      newPost => {
        dispatch(addPost(newPost));
        navigate('/posts');
      }
    );
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
