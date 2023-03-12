import React from 'react';

interface Children {
  children: React.ReactNode;
}

function Wrapper({ children }: Children) {
  return children;
}

export default Wrapper;
