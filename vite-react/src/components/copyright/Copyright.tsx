import {CopyrightOutlined} from '@ant-design/icons';
import {Typography} from 'antd';

const DEFAULT_MESSAGE = `${new Date().getFullYear()} 吴仙杰个人演示项目`;

export default function Copyright({message = DEFAULT_MESSAGE}: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">
        <CopyrightOutlined/>
        {' ' + message}
      </Typography.Text>
    </>
  );
}
