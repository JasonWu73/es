import React from 'react';
import '@/assets/linea-icons/styles.css';

const FEATURES = [
  {
    icon: 'icon-basic-world',
    title: '探索世界',
    body: '在大自然的怀抱中，我们可以栉风沐雨，临山观水；可以聆听鸟鸣欢歌，松涛海浪；可以感受来自田园的清新馨香的自然之风；在大自然的怀抱中我们不需要隐匿什么，也不需要雕饰什么，一切都是那样的自如随意；在大自然的怀抱中，我们可以暂时摆脱一切烦恼。'
  },
  {
    icon: 'icon-basic-compass',
    title: '遇见大自然',
    body: '面对着奔涌的江流，江水拍击着堤岸，感受着大自然中时光的流逝，犹如这东逝的水一般，昙花的一现，告诉我们，越是美丽的事物，它的美才是最值得珍惜的，错过了，无需感伤，杨柳枯了，有再青的时候；花儿谢了，也有再开的时候，这便是自然的轮回。'
  },
  {
    icon: 'icon-basic-map',
    title: '找到你的方式',
    body: '你可以登上高高的山冈，找一片空地躺下，对着蓝天，吸吮着它的深邃，它的一尘不染的芳馥。闭上双眼，嘴里潇洒地衔着一片被季节遗弃的枫叶，任微笑的阳光拂过，拂过那没有一丝皴皱的心田。清风吹拂，摇曳大自然的风铃；黄莺歌咏，鸣啭着大自然的心音。'
  },
  {
    icon: 'icon-basic-heart',
    title: '更健康的生活',
    body: '远离屏幕，将为您的心理健康和家人的安宁创造奇迹。在户外共度美好时光也是加深家庭纽带和留下独特回忆的好方法。在大自然中度过的时间是值得的。它不仅可以减轻压力，而且自然环境还可以改善您的情绪并改善身心健康。外面时间的价值怎么强调都不为过。'
  }
];

export default function TourFeatureList() {
  return (
    <section className="tour-section-features">
      <div className="row">
        {FEATURES.map(feature => (
          <div key={feature.icon} className="col-1-of-4">
            <div className="feature-box">
              <i className={`feature-box__icon ${feature.icon}`} />
              <h3 className="tour-heading-tertiary u-margin-bottom-small">
                {feature.title}
              </h3>
              <p className="feature-box__text">
                {feature.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
