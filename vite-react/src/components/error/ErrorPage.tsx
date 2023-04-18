import {Layout} from 'antd';
import RouteError from './RouteError';
import {usePageTitle} from '../../hooks/use-page-title';
import HeaderLayout from '../layout/HeaderLayout';
import FooterLayout from '../layout/FooterLayout';
import {ContentLayout} from '../layout/ContentLayout';

export default function ErrorPage({code = 404, message = '糟糕！未找到您要访问的页面 :('}) {
  usePageTitle(code + '');

  return (
    <Layout style={{minHeight: '100vh'}}>
      <HeaderLayout/>

      <ContentLayout>
        <RouteError code={code} message={message}/>
      </ContentLayout>

      <FooterLayout/>
    </Layout>
  );
}
