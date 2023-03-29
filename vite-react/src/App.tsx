import './App.scss';
import React from 'react';
import DemoList from './components/demo/DemoList';
import Button from './components/ui/Button';

function getFalse() {
  console.log('getFalse');
  return false;
}

export default function App() {
  console.log('=====App=====');
  const [titleState, setTitleState] = React.useState('Original Title');
  const nums = React.useMemo(() => initNums([11, 10]), []);

  function initNums(initials: number[]) {
    console.log('init number array');
    return [...initials, 2, 1, 4, 3];
  }

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
