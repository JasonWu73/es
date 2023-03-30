import React from 'react';

const MESSAGES = ['Planning to do work', 'Planning learn React.js', 'Cleaning house'];

const MessagesContext = React.createContext(MESSAGES);
const MessagesFilterContext = React.createContext((_: string) => {
});

export function MessageProvider({ children }: Props) {
  const [filteredMessages, setFilteredMessages] = React.useState(MESSAGES);

  function handMessagesFilter(filterMessage: string) {
    const filteredMessages = MESSAGES.filter(message => {
      return message.toLowerCase().includes(filterMessage.toLowerCase());
    });
    setFilteredMessages(filteredMessages);
  }

  return (
    <MessagesContext.Provider value={filteredMessages}>
      <MessagesFilterContext.Provider value={handMessagesFilter}>
        {children}
      </MessagesFilterContext.Provider>
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  return React.useContext(MessagesContext);
}

export function useMessagesFilter() {
  return React.useContext(MessagesFilterContext);
}

interface Props {
  children: React.ReactNode;
}
