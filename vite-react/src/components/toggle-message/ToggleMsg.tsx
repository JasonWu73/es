import React from 'react';
import Button from '../ui/Button';
import classes from './ToggleMsg.module.scss';
import MessageList from './MessageList';

export default function ToggleMsg() {
  const messages = React.useMemo(
    () => ['Message One', 'Message Two', 'Message Three'],
    []
  );
  const [showMessages, setShowMessages] = React.useState(true);

  function handleToggleHideOrShowMessagesClick() {
    setShowMessages(prevShow => !prevShow);
  }

  return (
    <div className={classes.toggle}>
      <Button
        onClick={handleToggleHideOrShowMessagesClick}
      >
        {`${showMessages ? 'Hide' : 'Show'} Messages`}
      </Button>
      {showMessages && <MessageList items={messages}/>}
    </div>
  );
};
