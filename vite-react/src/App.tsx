import './App.scss';
import React from 'react';
import Button from './components/ui/Button';
import DemoOutput from './components/demo/DemoOutput';

export default function App() {
  const [showParagraph, setShowParagraph] = React.useState(false);
  console.log('APP RUNNING');

  function handleToggleShowParagraph() {
    setShowParagraph(prevShowParagraph => !prevShowParagraph);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}/>
      <Button onClick={handleToggleShowParagraph}>Show Paragraph!</Button>
    </div>
  );
}
