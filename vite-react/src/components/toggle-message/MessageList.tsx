import React from 'react';
import classes from './MessageList.module.scss';

export default function MessageList({ items }: {
  items: string[]
}) {
  return (
    <ul className={classes.messages}>
      {items.map(msg => <li key={msg}>{msg}</li>)}
    </ul>
  );
}
