import React from 'react';

export default function TourBook() {
  return (
    <section className="tour-section-book">
      <div className="row">
        <div className="tour-book">
          <div className="tour-book__form">
            <form action="#" className="form" autoComplete="off">
              <div className="u-margin-bottom-medium">
                <h2 className="tour-heading-secondary">
                  立即预订
                </h2>
              </div>

              <div className="form__group">
                <input type="text" className="form__input" placeholder="姓名" id="name" required />
                <label htmlFor="name" className="form__label">姓名</label>
              </div>

              <div className="form__group">
                <input type="email" className="form__input" placeholder="邮箱" id="email" required />
                <label htmlFor="email" className="form__label">邮箱</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
