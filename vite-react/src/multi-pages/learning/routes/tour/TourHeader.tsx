import React from 'react';
import logo from '@/assets/tour/img/logo-white.png';

export default function TourHeader() {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src={logo} alt="Logo" className="header__logo" />
      </div>

      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">户外运动</span>
          <span className="heading-primary--sub">是生活发生的地方</span>
        </h1>

        <a
          href="#"
          className="btn btn--white btn--animated"
          onClick={e => e.preventDefault()}
        >
          发现我们的旅行
        </a>
      </div>
    </header>
  );
}
