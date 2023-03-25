import './App.scss';
import React from 'react';
import Button from './components/ui/Button';
import DemoOutput from './components/demo/DemoOutput';

function getFalse() {
  console.log('getFalse');
  return false;
}

export default function App() {
  const [showParagraph, setShowParagraph] = React.useState(getFalse);
  const [allowToggle, setAllowToggle] = React.useState(false);
  console.log('APP RUNNING');

  const handleToggleShowParagraph = React.useCallback(
    () => {
      if (allowToggle) {
        setShowParagraph(prevShowParagraph => !prevShowParagraph);
      }
    },
    [allowToggle]
  );

  const handleAllowToggle = React.useCallback(
    () => setAllowToggle(true),
    []
  );

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      <Button onClick={handleAllowToggle}>Allow Toggle</Button>
      <Button onClick={handleToggleShowParagraph}>Show Paragraph!</Button>
    </div>
  );
}
