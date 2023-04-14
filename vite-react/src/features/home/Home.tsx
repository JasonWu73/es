import {usePageTitle} from '../../hooks/use-page-title';
import {Card, Divider, List} from 'antd';
import Counter from '../counter/Counter';
import {PAGES} from '../../routes/Root';

export default function Home() {
  usePageTitle('Home');

  return (
    <>
      <MultiplePages/>
      <Counter/>
    </>
  );
}

function MultiplePages() {
  return (
    <Card style={{maxWidth: '60rem', margin: '1rem auto'}}>
      <Divider orientation="left">Multiple Page Links</Divider>
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
