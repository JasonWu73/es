import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';

export default function Grid() {
  usePageTitle('栅格 Grid - 浮动 Float');

  return (
    <section>
      <div className="row">
        <div className="col-1-of-2">
          第 1 列，共 2 列
        </div>
        <div className="col-1-of-2">
          第 2 列，共 2 列
        </div>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          第 1 列，共 3 列
        </div>
        <div className="col-1-of-3">
          第 2 列，共 3 列
        </div>
        <div className="col-1-of-3">
          第 3 列，共 3 列
        </div>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          第 1 列，共 3 列
        </div>
        <div className="col-2-of-3">
          第 2 + 3 列，共 3 列
        </div>
      </div>

      <div className="row">
        <div className="col-1-of-4">
          第 1 列，共 4 列
        </div>
        <div className="col-1-of-4">
          第 2 列，共 4 列
        </div>
        <div className="col-1-of-4">
          第 3 列，共 4 列
        </div>
        <div className="col-1-of-4">
          第 4 列，共 4 列
        </div>
      </div>

      <div className="row">
        <div className="col-1-of-4">
          第 1 列，共 4 列
        </div>
        <div className="col-1-of-4">
          第 2 列，共 4 列
        </div>
        <div className="col-2-of-4">
          第 3 + 4 列，共 4 列
        </div>
      </div>

      <div className="row">
        <div className="col-1-of-4">
          第 1 列，共 4 列
        </div>
        <div className="col-3-of-4 offset">
          第 2 + 3 + 4 列，共 4 列
        </div>
      </div>
    </section>
  );
}
