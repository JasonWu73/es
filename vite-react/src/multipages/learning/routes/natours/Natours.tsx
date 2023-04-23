import React from 'react';
import styles from './Natours.module.scss';
import { usePageTitle } from '../../../../hooks/use-page-title';
import NatoursHeader from './NatoursHeader';

export default function Natours() {
  usePageTitle('Natours');

  return (
    <div className={styles['natours']}>
      <NatoursHeader />
    </div>
  );
}
