import {usePageTitle} from '../../shared/hooks/use-page-title';
import {Card, Divider, Layout, List, Typography} from 'antd';
import {Link} from 'react-router-dom';
import classes from '../counter/Counter.module.scss';
import reduxLogo from '../../shared/assets/img/redux-logo.svg';
import Copyright from '../../shared/components/copyright/Copyright';
import Counter from '../counter/Counter';

const PAGES = [
  {
    title: 'React Redux',
    url: 'counter/index.html',
    description: '单独测试 React Redux'
  },
  {
    title: 'React Router',
    url: 'post/index.html',
    description: '单独测试 React Router'
  }
];

export default function Home() {
  usePageTitle('首页');

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Header style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/">
          <Typography.Title level={2} style={{color: 'white', marginBottom: 0}}>多页面应用 Demo</Typography.Title>
        </Link>
      </Layout.Header>

      <Layout.Content>
        <MultiplePages/>

        <div className={classes.counter}>
          <div className={classes.counter__header}>
            <img src={reduxLogo} className={classes.logo} alt="Redux logo"/>
            <Counter/>
          </div>
        </div>
      </Layout.Content>

      <Layout.Footer style={{textAlign: 'center'}}>
        <Copyright/>
      </Layout.Footer>
    </Layout>
  );
}

function MultiplePages() {
  return (
    <>
      <Card style={{maxWidth: '60rem', margin: '2rem auto'}}>
        <Divider orientation="left">多页面链接</Divider>
        <List
          itemLayout="horizontal"
          dataSource={PAGES}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.url}>{index + 1} - {item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
