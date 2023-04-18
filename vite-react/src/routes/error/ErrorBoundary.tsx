import {Layout} from 'antd';
import {FooterLayout, HeaderLayout} from '../layout/AdminLayout';
import RouteError from '../../components/error/RouteError';
import {usePageTitle} from '../../hooks/use-page-title';

export default function ErrorBoundary({code = 404, message = '糟糕！未找到您要访问的页面 :('}) {
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
