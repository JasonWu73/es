import React from 'react';

export default function Tours() {
  return (
    <section className="section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">
          最受欢迎的旅游
        </h2>
      </div>

      <div className="row">
        <div className="col-1-of-3">
          <div className="card">
            <div className="card__side card__side--front">
              Front Side
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
