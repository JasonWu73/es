import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterLayout from '@/components/layout/FooterLayout';

export default function Root() {
  return (
    <>
      <Outlet />
      <FooterLayout style={{ backgroundColor: 'transparent' }} />
    </>
  );
}
