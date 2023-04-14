import {Layout} from 'antd';
import {FooterLayout, HeaderLayout} from '../Root';
import RouteError from '../../components/error/RouteError';

export default function ErrorPage({error, message}: { error: number, message: string }) {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <HeaderLayout/>

      <Layout.Content>
        <RouteError code={error} message={message}/>
      </Layout.Content>

      <FooterLayout/>
    </Layout>
  );
}
