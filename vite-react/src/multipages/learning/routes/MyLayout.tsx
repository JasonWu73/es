import {Outlet, useNavigation} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import {Layout} from 'antd';
import FooterLayout from '../../../components/layout/FooterLayout';
import HeaderLayout from '../../../components/layout/HeaderLayout';
import {ContentLayout} from '../../../components/layout/ContentLayout';
import {SkeletonLoading} from '../../../components/loading/SuspenseLoading';

export default function MyLayout() {
  const navigation = useNavigation();

  return (
    <Layout style={{minHeight: '100dvh'}}>
      <HeaderLayout/>

      <ContentLayout>
        <MainNavigation/>

        <div style={{textAlign: 'center'}}>
          {navigation.state === 'loading' && <SkeletonLoading/>}
          {navigation.state !== 'loading' && <Outlet/>}
        </div>
      </ContentLayout>

      <FooterLayout/>
    </Layout>
  );
}
