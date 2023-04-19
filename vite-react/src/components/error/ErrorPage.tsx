import {Layout} from 'antd';
import RouteError from './RouteError';
import {usePageTitle} from '../../hooks/use-page-title';
import HeaderLayout from '../layout/HeaderLayout';
import FooterLayout from '../layout/FooterLayout';

export default function ErrorPage({code = 404, message = '糟糕！未找到您要访问的页面 :('}) {
  usePageTitle(code + '');

  return (
    <Layout style={{minHeight: '100dvh'}}>
      <HeaderLayout/>

      <Layout.Content style={{display: 'flex'}}>
        <RouteError code={code} message={message}/>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}
