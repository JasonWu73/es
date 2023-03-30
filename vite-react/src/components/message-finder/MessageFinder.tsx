import React from 'react';
import classes from './MessageFinder.module.scss';
import { MessagesFilterContext } from '../toggle-message/MessageContext';

export default class MessageFinder extends React.Component<any, State> {
  declare context: React.ContextType<typeof MessagesFilterContext>;
  static contextType = MessagesFilterContext;
  state = {
    filterMessage: ''
  };

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>) {
    console.log('componentDidUpdate');
    if (prevState.filterMessage === this.state.filterMessage) {
      return;
    }
    const handleMessagesFilter = this.context;
    handleMessagesFilter(this.state.filterMessage.trim());
  }

  render() {
    return (
      <form className={classes.finder}>
        <label>
          Message: {' '}
          <input
            type="search"
            value={this.state.filterMessage}
            onChange={this.handleChange.bind(this)}
          />
        </label>
      </form>
    );
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const enteredMessage = event.target.value;
    this.setState({ filterMessage: enteredMessage });
  }
}

interface State {
  filterMessage: string;
}

/*
export default function MessageFinder() {
  const [filterMessage, setFilterMessage] = React.useState('');
  useFilter(filterMessage.trim());

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterMessage(event.target.value);
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

function useFilter(filterMessage: string) {
  const handleMessagesFilter = useMessagesFilter();

  React.useEffect(() => {
    handleMessagesFilter(filterMessage);
  }, [filterMessage]);
}
*/
