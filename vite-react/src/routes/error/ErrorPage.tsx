import {Layout} from 'antd';
import {FooterLayout, HeaderLayout} from '../AdminLayout';
import RouteError from '../../components/error/RouteError';
import {usePageTitle} from '../../hooks/use-page-title';

export default function ErrorPage({code, message}: { code: number, message: string }) {
  usePageTitle(code + '');

  return (
    <Layout style={{minHeight: '100vh'}}>
      <HeaderLayout/>

      <Layout.Content>
        <RouteError code={code} message={message}/>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}
