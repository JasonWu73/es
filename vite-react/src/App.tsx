import React from 'react';
import './App.scss';
import ToggleMessages from './components/toggle-message/ToggleMessages';
import MessageFinder from './components/message-finder/MessageFinder';
import { MessageProvider } from './components/toggle-message/MessageContext';
import ErrorBoundary from './components/error/ErrorBoundary';

export default function App() {
  return (
    <div className="app">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <MessageProvider>
          <MessageFinder/>
          <ToggleMessages/>
        </MessageProvider>
      </ErrorBoundary>
    </div>
  );
}
