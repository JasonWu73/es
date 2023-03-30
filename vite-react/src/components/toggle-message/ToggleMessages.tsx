import React from 'react';
import Button from '../ui/Button';
import classes from './ToggleMsg.module.scss';
import MessageList from './MessageList';
import { useMessages } from './MessageContext';

/*
export default class ToggleMessages extends React.Component<
  Props,
  { showMessages: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showMessages: true
    };
  }

  render() {
    return (
      <div className={classes.toggle}>
        <Button
          onClick={this.handleToggleHideOrShowMessagesClick.bind(this)}
        >
          {`${this.state.showMessages ? 'Hide' : 'Show'} Messages`}
        </Button>
        {this.state.showMessages && <MessageList items={this.props.items}/>}
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
*/

export default function ToggleMessages() {
  const messages = useMessages();
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
