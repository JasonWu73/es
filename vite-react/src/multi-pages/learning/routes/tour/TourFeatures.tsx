import '@/assets/linea-icons/styles.css';

export default function TourFeatures() {
  return (
    <section className="section-features">
      <div className="row">
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-world" />
            <h3 className="heading-tertiary u-margin-bottom-small">探索世界</h3>
            <p className="feature-box__text">
              在大自然的怀抱中，我们可以栉风沐雨，临山观水；可以聆听鸟鸣欢歌，松涛海浪；
              可以感受来自田园的清新馨香的自然之风；在大自然的怀抱中我们不需要隐匿什么，
              也不需要雕饰什么，一切都是那样的自如随意；在大自然的怀抱中，我们可以暂时摆脱一切烦恼，
              让思想进入一种脱俗而不羁的境界。
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-compass" />
            <h3 className="heading-tertiary u-margin-bottom-small">遇见大自然</h3>
            <p className="feature-box__text">
              子在川上曰：“逝者如斯乎”面对着奔涌的江流，江水拍击着堤岸，感受着大自然中时光的流逝，
              犹如这东逝的水一般，昙花的一现，告诉我们，越是美丽的事物，它的美才是最值得珍惜的，
              错过了，无需感伤，杨柳枯了，有再青的时候；花儿谢了，也有再开的时候，这便是自然的轮回。
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-map" />
            <h3 className="heading-tertiary u-margin-bottom-small">找到你的方式</h3>
            <p className="feature-box__text">
              投身大自然，你可以登上高高的山冈，找一片空地躺下，对着蓝天，吸吮着它的深邃，它的一尘不染的芳馥。
              闭上双眼，嘴里潇洒地衔着一片被季节遗弃的枫叶，任微笑的阳光拂过，拂过那没有一丝皴皱的心田。
              清风吹拂，摇曳大自然的风铃；黄莺歌咏，鸣啭着大自然的心音。
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-heart" />
            <h3 className="heading-tertiary u-margin-bottom-small">过上更健康的生活</h3>
            <p className="feature-box__text">
              远离屏幕，将为您的心理健康和家人的安宁创造奇迹。在户外共度美好时光也是加深家庭纽带和留下独特回忆的好方法。
              在大自然中度过的时间是值得的。它不仅可以减轻压力，而且自然环境还可以改善您的情绪并改善身心健康。
              外面时间的价值怎么强调都不为过。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
