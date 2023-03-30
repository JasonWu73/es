import React from 'react';
import './App.scss';
import ToggleMessages from './components/toggle-message/ToggleMessages';
import MessageFinder from './components/message-finder/MessageFinder';
import Button from './components/ui/Button';

const MESSAGES = ['Planning to do work', 'Planning learn React.js', 'Cleaning house'];

export default function App() {
  const [filteredMessages, setFilteredMessages] = React.useState(MESSAGES);
  const [showMessageFinder, setShowMessageFinder] = React.useState(true);

  function handleFind(filterMessage: string) {
    const filteredMessages = MESSAGES.filter(message => {
      return message.toLowerCase().includes(filterMessage.toLowerCase());
    });
    setFilteredMessages(filteredMessages);
  }

  function handleFinderRemoveClick() {
    setShowMessageFinder(false);
  }

  return (
    <div className="app">
      {showMessageFinder && <MessageFinder onFind={handleFind}/>}
      <Button onClick={handleFinderRemoveClick}>Remove Message Filter</Button>
      <ToggleMessages items={filteredMessages}/>
    </div>
  );
}
