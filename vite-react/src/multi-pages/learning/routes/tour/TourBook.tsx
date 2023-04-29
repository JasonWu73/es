import React from 'react';

export default function TourBook() {
  return (
    <section className="tour-section-book">
      <div className="row">
        <div className="tour-book">
          <div className="tour-book__form">
            <form
              action="#"
              className="form"
              autoComplete="off"
              onSubmit={e => e.preventDefault()}
            >
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

              <div className="form__group u-margin-bottom-medium">
                <div className="form__radio-group">
                  <input type="radio" className="form__radio-input" id="small" name="size" />
                  <label htmlFor="small" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    小型旅行团
                  </label>
                </div>

                <div className="form__radio-group">
                  <input type="radio" className="form__radio-input" id="large" name="size" />
                  <label htmlFor="large" className="form__radio-label">
                    <span className="form__radio-button"></span>
                    大型旅行团
                  </label>
                </div>
              </div>

              <div className="form__group">
                <button className="btn btn--green">下一步 &rarr;</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
