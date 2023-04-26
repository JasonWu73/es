import React from 'react';
import photo1 from '@/assets/tour/img/nat-1-large.jpg';
import photo2 from '@/assets/tour/img/nat-2-large.jpg';
import photo3 from '@/assets/tour/img/nat-3-large.jpg';
import TourFeatures from '@/multi-pages/learning/routes/tour/TourFeatures';
import Tours from '@/multi-pages/learning/routes/tour/Tours';

const ABOUTS = [
  {
    title: '大自然的五彩缤纷',
    body: '大自然是一个神奇的魔术师，把世界万物变得五颜六色。每个季节都十分美丽，但春姑娘的颜色是最多的。这都是大自然给的。大自然给予了春天许许多多的东西。是大自然把枯萎的树皮洒满了红、白、绿等不同的颜色；是大自然把山坡点缀得五彩缤纷；是大自然把森林协奏曲谱上了乐章；是大自然为花儿穿上美丽、鲜艳的衣裳，喷上馥郁的清香，使它们个个争妍斗艳，好不美丽。'
  },
  {
    title: '大自然好像一首曲',
    body: '大自然好像一首曲，一首无边无际的曲，每个音符都带有动听的音律，每个音节都带着欢快的节奏，每个音段都带有柔美和安适，歌曲自然而不失感点，多似水中有动的鱼儿，自由，愉快。这首曲载着倾听者无虑的梦想，使倾听者感受曲中大自然的鸟语花香，大自然的多彩芬芳，思绪沉沦在大自然如此令人向往之中。'
  }
];

const PHOTOS = [
  {
    src: photo1,
    alt: 'Photo 1',
    id: 'p1'
  },
  {
    src: photo2,
    alt: 'Photo 2',
    id: 'p2'
  },
  {
    src: photo3,
    alt: 'Photo 3',
    id: 'p3'
  }
];

export default function TourMain() {
  return (
    <main>
      <section className="tour-section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="tour-heading-secondary">
            为喜欢冒险的人而准备的激动人心的旅行
          </h2>
        </div>

        <div className="row">
          <div className="col-1-of-2">
            {ABOUTS.map(about => (
              <React.Fragment key={about.title}>
                <h3 className="tour-heading-tertiary u-margin-bottom-small">
                  {about.title}
                </h3>
                <p className="tour-paragraph">
                  {about.body}
                </p>
              </React.Fragment>
            ))}

            <a
              href="#"
              className="btn-text"
              onClick={e => e.preventDefault()}
            >
              了解更多 &rarr;
            </a>
          </div>
          <div className="col-1-of-2">
            <div className="composition">
              {PHOTOS.map(photo => (
                <img
                  key={photo.id}
                  src={photo.src}
                  alt={photo.alt}
                  className={`composition__photo composition__photo--${photo.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <TourFeatures />
      <Tours />
    </main>
  );
};
