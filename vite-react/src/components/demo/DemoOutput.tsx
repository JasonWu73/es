import React from 'react';
import MyParagraph from './MyParagraph';

export default function DemoOutput({ show }: DemoOutputProps) {
  console.log('DemoOutput RUNNING');
  return (
    <MyParagraph>{show ? 'This is new!' : ''}</MyParagraph>
  );
};

interface DemoOutputProps {
  show: boolean;
}
