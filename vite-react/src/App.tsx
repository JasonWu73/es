import './App.scss';
import React from 'react';
import Button from './components/ui/Button';

export default function App() {
  const [showParagraph, setShowParagraph] = React.useState(false);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>This is new!</p>}
      <Button style="green">Show Paragraph!</Button>
    </div>
  );
}
