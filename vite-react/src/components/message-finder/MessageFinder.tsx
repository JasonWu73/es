import React, { useEffect } from 'react';
import classes from './MessageFinder.module.scss';

export default function MessageFinder({ onFind }: {
  onFind: (filterMessage: string) => void
}) {
  const [filterMessage, setFilterMessage] = React.useState('');
  useFilter(filterMessage, onFind);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const enteredMessage = event.target.value.trim();
    setFilterMessage(enteredMessage);
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

function useFilter(filterMessage: string, onFind: (filterMessage: string) => void) {
  useEffect(() => {
    onFind(filterMessage);
  }, [filterMessage]);
}
