import React from 'react';
import nat8 from '@/assets/tour/img/nat-8.jpg';

const STORIES = [
  {
    id: 1,
    title: '我和家人度过了最美好的一周',
    body: '工作别太疲惫，心情别太郁闷，没事多喝点水，周末多多聚会，友情最为珍贵，朋友真心相对，生活添点趣味，天天快乐相随!',
    imgSrc: nat8
  }
];

export default function TourStoryList() {
  return (
    <section className="tour-section-stories">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="tour-heading-secondary">
          为人们带来真正的快乐
        </h2>
      </div>

      {STORIES.map(story => (
        <div key={story.id} className="row">
          <div className="story">
            <figure className="story__shape">
              <img src={story.imgSrc} alt="旅游的人" className="story__img" />
            </figure>

            <div className="story__text">
              <h3 className="tour-heading-tertiary u-margin-bottom-small">
                {story.title}
              </h3>
              <p>{story.body}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
