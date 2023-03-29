import React from 'react';
import classes from './DemoList.module.scss';

export default React.memo(DemoList);

function DemoList({ title, items }: {
  title: string,
  items: number[]
}) {
  console.log('====DemoList====');
  const sortedItems = React.useMemo(
    () => {
      console.log('sorting items');
      const copiedItems = [...items];
      return copiedItems.sort((a, b) => {
        return a - b;
      });
    },
    [items]
  );

  return (
    <div className={classes.list}>
      <h2>{title}</h2>
      <ul>
        {sortedItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
