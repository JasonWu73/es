import React from 'react';

const TOURS = [
  {
    id: 1,
    title: '海洋探险家',
    details: ['3 日游', '最多 30 人', '2 名导游', '睡在舒适的酒店', '难度：容易'],
    price: '1,782'
  },
  {
    id: 2,
    title: '森林旅行者',
    details: ['7 日游', '最多 40 人', '6 名导游', '睡在提供的帐篷', '难度：中等'],
    price: '2,479'
  },
  {
    id: 3,
    title: '雪地冒险家',
    details: ['5 日游', '最多 15 人', '3 名导游', '睡在提供的帐篷', '难度：困难'],
    price: '5,262'
  }
];

export default function TourList() {
  return (
    <section className="tour-section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="tour-heading-secondary">
          最受欢迎的旅游
        </h2>
      </div>

      <div className="row">
        {TOURS.map(tour => (
          <div key={tour.id} className="col-1-of-3">
            <div className="card">
              <div className="card__side card__side--front">
                <div className={`card__picture card__picture--${tour.id}`}>
                  &nbsp;
                </div>
                <h4 className="card__heading">
                <span className={`card__heading-span card__heading-span--${tour.id}`}>
                  {tour.title}
                </span>
                </h4>
                <div className="card__details">
                  <ul>
                    {tour.details.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={`card__side card__side--back card__side--back-${tour.id}`}>
                <div className="card__action">
                  <div className="card__price-box">
                    <p className="card__price-only">仅需</p>
                    <p className="card__price-value">¥{tour.price}</p>
                  </div>
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="btn btn--white"
                  >
                    立即预订
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="u-center-text u-margin-top-big">
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className="btn btn--green"
        >
          发现所有旅游
        </a>
      </div>
    </section>
  );
}
