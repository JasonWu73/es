import { ReactNode } from 'react';

interface Children {
  children: ReactNode;
}

export default function Wrapper({ children }: Children) {
  return children;
}
