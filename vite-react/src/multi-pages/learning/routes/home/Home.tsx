import React from 'react';
import {useTitle} from '@/hooks/use-page';
import {Link} from 'react-router-dom';

export default function Home() {
  useTitle('Learning');

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/learning">Learning</Link></li>
          <li><Link to="/tour">去旅行吧 🏝️</Link></li>
          <li><Link to="/grid">栅格 Grid - 浮动 Float</Link></li>
        </ul>
      </nav>
    </>
  );
};
