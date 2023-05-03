import React from 'react';
import nat8 from '@/assets/tour/img/nat-8.jpg';
import nat9 from '@/assets/tour/img/nat-9.jpg';

export default function TourPopup() {
  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__left">
          <img src={nat8} alt="游行照片" className="popup__img" />
          <img src={nat9} alt="游行照片" className="popup__img" />
        </div>
        <div className="popup__right">
          <h2 className="tour-heading-secondary">开始预订</h2>
          <h3 className="tour-heading-tertiary">重要 &ndash; 请阅读相关条款</h3>
          <p className="popup__text">
            只想进行一场漫无目的的旅行，在一个有花有海、安静缓慢的地方晒着太阳无所事事。我在时间的轨迹上徘徊，踏上每一列经过的车。沿途的风景在渐渐远去，我举着那快叫思念的车牌，等待着最后一站——故乡。那时，青年人不断思考，却什么答案也得不到，于是他们去流浪;这天，青年人不去思考，无数答案和观点就已将我们包围，于是我们去旅游。一颗说走就走的心，一个会拍照的情侣，一段甜蜜的旅程。我和西藏之间，只隔着一张火车票!每个人心中，都会有一个古镇情怀，流水江南，烟笼人家。人生至少要有两次冲动，一为奋不顾身的爱情，一为说走就走的旅行。旅行是一种病，当你把身边的人都传染了，而你自己根本不想从中跑出来。出去旅行，不是去看风景，而是去寻回自己——最本真的自己。一辈子是场修行，短的是旅行，长的是人生。
          </p>
          <div className="btn btn--green">立即预订</div>
        </div>
      </div>
    </div>
  );
}
