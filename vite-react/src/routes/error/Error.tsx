import {Layout} from 'antd';
import {FooterLayout, HeaderLayout} from '../Root';
import NotFound from '../../components/not-found/NotFound';

export default function Error() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <HeaderLayout/>

      <Layout.Content>
        <NotFound/>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}
