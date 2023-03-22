import styles from './Card.module.scss';
import { ReactNode } from 'react';

export default function Card({ children }: Props) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

interface Props {
  children: ReactNode;
}
