import React from 'react';

export default function MyParagraph({ children }: MyParagraphProps) {
  console.log('MyParagraph RUNNING');
  return (
    <p>{children}</p>
  );
}

interface MyParagraphProps {
  children: React.ReactNode;
}
