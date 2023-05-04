import React from 'react';
import logo from '@/assets/tour/img/logo-white.png';

export default function TourHeader() {

  function handleScrollToClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const anchorEl = event.target as HTMLAnchorElement;
    const href = anchorEl.getAttribute('href')!;
    document.querySelector(href)!.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="tour-header">
      <div className="tour-header__logo-box">
        <img src={logo} alt="Logo" className="tour-header__logo" />
      </div>

      <div className="tour-header__text-box">
        <h1 className="tour-heading-primary">
          <span className="tour-heading-primary--main">户外运动</span>
          <span className="tour-heading-primary--sub">是生活发生的地方</span>
        </h1>

        <a
          href={'#section-tours'}
          className="btn btn--white btn--animated"
          onClick={handleScrollToClick}
        >
          发现我们的旅行
        </a>
      </div>
    </header>
  );
}
