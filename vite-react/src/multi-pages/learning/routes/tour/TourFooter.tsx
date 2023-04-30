import React from 'react';
import logoGreen from '@/assets/tour/img/logo-green-2x.png';

const NAVIGATIONS = [
  {
    id: 1,
    href: '#',
    name: '公司'
  },
  {
    id: 2,
    href: '#',
    name: '联系我们'
  },
  {
    id: 3,
    href: '#',
    name: '街道'
  },
  {
    id: 4,
    href: '#',
    name: '隐私政策'
  },
  {
    id: 5,
    href: '#',
    name: '条款'
  }
];

export default function TourFooter() {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img src={logoGreen} alt="大 Logo" className="footer__logo" />
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              {NAVIGATIONS.map(navigation => (
                <li key={navigation.id} className="footer__item">
                  <a href={navigation.href} onClick={e => e.preventDefault()} className="footer__link">
                    {navigation.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-1-of-2">
          <p className="footer__copyright">
            由 <a href="#" onClick={e => e.preventDefault()} className="footer__link">Jonas Schmedtmann</a> 为他的课程设计。你可以将此页面设计用途个人或商业用途，但不可声明此设计的作者是你自己！
          </p>
        </div>
      </div>
    </footer>
  );
}
