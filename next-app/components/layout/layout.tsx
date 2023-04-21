import React from 'react';
import Navbar from '@/components/layout/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mt-11">
        {children}
      </main>
    </>
  );
}
