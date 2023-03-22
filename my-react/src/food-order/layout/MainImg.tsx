import styles from './MainImg.module.scss';
import mealsImg from './meals-on-white-ceramic-plate.jpg';

export default function MainImg() {
  return (
    <div className={styles['main-img']}>
      <img src={mealsImg} alt="Meals on white ceramic plate"/>
    </div>
  );
};
