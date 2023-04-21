import React from 'react';
import Navbar from '@/components/layout/navbar';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

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
