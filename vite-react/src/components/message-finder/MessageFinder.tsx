import React from 'react';
import classes from './MessageFinder.module.scss';

/*
export default class MessageFinder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filterMessage: ''
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    console.log('componentDidUpdate');
    if (prevState.filterMessage === this.state.filterMessage) {
      return;
    }
    this.props.onFind(this.state.filterMessage.trim());
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

interface Props {
  onFind: (filterMessage: string) => void;
}

interface State {
  filterMessage: string;
}
*/

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
  React.useEffect(() => {
    onFind(filterMessage);
  }, [filterMessage]);
}