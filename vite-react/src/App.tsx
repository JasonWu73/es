import './App.scss';
import React from 'react';
import DemoList from './components/demo/DemoList';
import Button from './components/ui/Button';

function getFalse() {
  console.log('getFalse');
  return false;
}

export default function App() {
  console.log("=====App=====");
  const [titleState, setTitleState] = React.useState('Original Title');
  const [nums, setNums] = React.useState([2, 1, 3, 6]);

  const handleChangeTitleClick = React.useCallback(() => {
    setTitleState(Math.random().toString());
  }, []);

  return (
    <div className="app">
      <DemoList title={titleState} items={nums}/>
      <Button onClick={handleChangeTitleClick}>Change Title</Button>
    </div>
  );
}
