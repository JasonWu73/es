import React from 'react';

export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <form className="flex flex-col text-center gap-4 ">
      {children}
    </form>
  );
}
