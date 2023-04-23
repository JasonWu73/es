import { Layout, Typography } from 'antd';
import { AiOutlineCopyright } from 'react-icons/all';

export default function FooterLayout() {
  return (
    <Layout.Footer>
      <Copyright />
    </Layout.Footer>
  );
}

const DEFAULT_MESSAGE = `${new Date().getFullYear()} 吴仙杰个人演示项目`;

function Copyright({ message = DEFAULT_MESSAGE }: { message?: string }) {
  return (
    <>
      <Typography.Text
        type="secondary"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
      >
        <AiOutlineCopyright /> {message}
      </Typography.Text>
    </>
  );
}
