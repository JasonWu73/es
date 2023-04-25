import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import { Link } from 'react-router-dom';

export default function Home() {
  usePageTitle('Learning');

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/tour">去旅行吧 🏝️</Link></li>
          <li><Link to="/grid">栅格 Grid - 浮动 Float</Link></li>
        </ul>
      </nav>
    </>
  );
};
