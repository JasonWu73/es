import React from 'react';

export default function TourList() {
  return (
    <section className="tour-section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="tour-heading-secondary">
          最受欢迎的旅游
        </h2>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          <div className="card">
            <div className="card__side card__side--front">
              <div className="card__picture card__picture--1">
                &nbsp;
              </div>
              <h4 className="card__heading">
                <span className="card__heading-span card__heading-span--1">
                  海洋探险家
                </span>
              </h4>
              <div className="card__details">
                <ul>
                  <li>3日游</li>
                  <li>最多 30 人</li>
                  <li>2 名导游</li>
                  <li>舒适的酒店</li>
                  <li>难度：容易</li>
                </ul>
              </div>
            </div>

            <div className="card__side card__side--back card__side--back-1">
              Back Side
            </div>
          </div>
        </div>
        <div className="col-1-of-3">
          第 2 列，共 3 列
        </div>
        <div className="col-1-of-3">
          第 3 列，共 3 列
        </div>
      </div>
    </section>
  );
}
