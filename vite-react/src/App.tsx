import React from 'react';
import './App.scss';
import ToggleMessages from './components/toggle-message/ToggleMessages';
import MessageFinder from './components/message-finder/MessageFinder';

const MESSAGES = ['Message One', 'Message Two', 'Message Three'];

export default function App() {
  const [filteredMessages, setFilteredMessages] = React.useState(MESSAGES);

  function handleFind(filterMessage: string) {
    const filteredMessages = MESSAGES.filter(message => {
      return message.toLowerCase().includes(filterMessage.toLowerCase());
    });
    setFilteredMessages(filteredMessages);
  }

  return (
    <div className="app">
      <MessageFinder onFind={handleFind}/>
      <ToggleMessages items={filteredMessages}/>
    </div>
  );
}
