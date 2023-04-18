import {Layout, Typography} from 'antd';
import {CopyrightOutlined} from '@ant-design/icons';

export default function FooterLayout() {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      <Copyright/>
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `${new Date().getFullYear()} 吴仙杰个人演示项目`;

function Copyright({message = DEFAULT_MESSAGE}: { message?: string }) {
  return (
    <>
      <Typography.Text type="secondary">
        <CopyrightOutlined/> {message}
      </Typography.Text>
    </>
  );
}
