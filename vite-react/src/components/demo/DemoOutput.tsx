import React from 'react';
import MyParagraph from './MyParagraph';

const DemoOutput = React.memo(function DemoOutput({ show }: DemoOutputProps) {
  console.log('DemoOutput RUNNING');
  return (
    <MyParagraph>{show ? 'This is new!' : ''}</MyParagraph>
  );
});

export default DemoOutput;

interface DemoOutputProps {
  show: boolean;
}
