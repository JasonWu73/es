import './App.scss';
import React from 'react';
import Button from './components/ui/Button';

export default function App() {
  const [showParagraph, setShowParagraph] = React.useState(false);
  console.log('APP RUNNING');

  function handleToggleShowParagraph() {
    setShowParagraph(prevShowParagraph => !prevShowParagraph);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>This is new!</p>}
      <Button
        onClick={handleToggleShowParagraph}
        style="green"
      >
        Show Paragraph!
      </Button>
    </div>
  );
}
