import React from 'react';

const NAVIGATIONS = [
  { id: '01', name: '关于旅行' },
  { id: '02', name: '你的优势' },
  { id: '03', name: '热门旅游' },
  { id: '04', name: '旅行故事' },
  { id: '05', name: '立即预订' }
];

export default function TourNavigation() {
  return (
    <section className="navigation">
      <input type="checkbox" className="navigation__checkbox" id="navigation-toggle" />
      <label htmlFor="navigation-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          {NAVIGATIONS.map(navigation => (
            <li key={navigation.id} className="navigation__item">
              <a href="#" className="navigation__link" onClick={e => e.preventDefault()}>
                <span>{navigation.id}</span>{navigation.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
