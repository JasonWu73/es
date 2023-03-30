import React from 'react';
import Button from '../ui/Button';
import classes from './ToggleMsg.module.scss';
import MessageList from './MessageList';

const MESSAGES = ['Message One', 'Message Two', 'Message Three'];

export default class ToggleMsg extends React.Component<
  void,
  { showMessages: boolean }
> {
  state = {
    showMessages: true
  };

  render() {
    return (
      <div className={classes.toggle}>
        <Button
          onClick={this.handleToggleHideOrShowMessagesClick.bind(this)}
        >
          {`${this.state.showMessages ? 'Hide' : 'Show'} Messages`}
        </Button>
        {this.state.showMessages && <MessageList items={MESSAGES}/>}
      </div>
    );
  }

  handleToggleHideOrShowMessagesClick() {
    this.setState(prevState => {
      return {
        ...prevState,
        showMessages: !prevState.showMessages
      };
    });
  };
}

/*
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
*/
