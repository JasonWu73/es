import React from 'react';
import { useTitle } from '@/hooks/use-page';
import { Card, Divider, List } from 'antd';
import { PAGES } from '@/components/layout/HeaderLayout';

export default function Home() {
  useTitle('首页');

  return (
    <>
      <MultiplePages />
    </>
  );
}

function MultiplePages() {
  return (
    <Card style={{ maxWidth: '60rem', margin: '1rem auto' }}>
      <Divider orientation="left">多页链接</Divider>
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
