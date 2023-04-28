import React from 'react';
import nat8 from '@/assets/tour/img/nat-8.jpg';
import nat9 from '@/assets/tour/img/nat-9.jpg';
import videoMp4 from '@/assets/tour/img/video.mp4';
import videoWebm from '@/assets/tour/img/video.webm';

const STORIES = [
  {
    id: 1,
    person: '叶蔷薇',
    title: '我和家人度过了最美好的一周',
    body: '工作别太疲惫，心情别太郁闷，没事多喝点水，周末多多聚会，友情最为珍贵，朋友真心相对，生活添点趣味，天天快乐相随!',
    imgSrc: nat8
  },
  {
    id: 2,
    person: '吴仙杰',
    title: '哇！我的生活现次变得不同了',
    body: '一个人，只有永远拥有充满梦想和激-情的心灵，才能真正懂得生活的意义，也才能从真正的意义上享受生活！',
    imgSrc: nat9
  }
];

export default function TourStoryList() {
  return (
    <section className="tour-section-stories">
      <div className="background-video">
        <video className="background-video__content" autoPlay muted loop>
          <source src={videoMp4} type="video/mp4" />
          <source src={videoWebm} type="video/webm" />
          抱歉，您的浏览器版本过低不支持播放 MP4 或 Webm 格式视频！
        </video>
      </div>

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
              <figcaption className="story__caption">{story.person}</figcaption>
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

      <div className="u-center-text u-margin-top-big">
        <a
          href="#"
          onClick={e => e.preventDefault()}
          className="btn-text"
        >
          发现所有故事 &rarr;
        </a>
      </div>
    </section>
  );
};
