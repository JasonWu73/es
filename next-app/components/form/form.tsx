import React from 'react';

export default function Form({ children, onSubmit }: {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col text-center gap-4">
      {children}
    </form>
  );
}
