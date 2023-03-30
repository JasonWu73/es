import React from 'react';
import './App.scss';
import ToggleMessages from './components/toggle-message/ToggleMessages';
import MessageFinder from './components/message-finder/MessageFinder';
import { MessageProvider } from './components/toggle-message/MessageContext';

export default function App() {
  return (
    <div className="app">
      <MessageProvider>
        <MessageFinder/>
        <ToggleMessages/>
      </MessageProvider>
    </div>
  );
}
