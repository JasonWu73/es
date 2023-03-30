import React from 'react';
import classes from './MessageFinder.module.scss';

export default function MessageFinder({ onFind }: {
  onFind: (filterMessage: string) => void
}) {
  const [filterMessage, setFilterMessage] = React.useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const enteredMessage = event.target.value.trim();
    setFilterMessage(enteredMessage);
    onFind(enteredMessage);
  }

  return (
    <form className={classes.finder}>
      <label>
        Message: {' '}
        <input type="search" value={filterMessage} onChange={handleChange}/>
      </label>
    </form>
  );
};
