import {usePageTitle} from '../../shared/hooks/use-page-title';
import {Card, Divider, List} from 'antd';
import classes from '../counter/Counter.module.scss';
import reduxLogo from '../../shared/assets/img/redux-logo.svg';
import Counter from '../counter/Counter';
import {PAGES} from '../Root';

export default function Home() {
  usePageTitle('首页');

  return (
    <>
      <MultiplePages/>

      <div className={classes.counter}>
        <div className={classes.counter__header}>
          <img src={reduxLogo} className={classes.logo} alt="Redux logo"/>
          <Counter/>
        </div>
      </div>
    </>
  );
}

function MultiplePages() {
  return (
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
  );
}
