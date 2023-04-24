import React from 'react';
import styles from './Natours.module.scss';
import { usePageTitle } from '@/hooks/use-page-title';
import Favicon from '@/assets/natours/img/favicon.png';
import NatoursHeader from './NatoursHeader';
import { changeFavicon } from '@/utils/page';

export default function Natours() {
  usePageTitle('Natours');
  useFavicon();

  return (
    <div className={styles['natours']}>
      <NatoursHeader />
    </div>
  );
}

function useFavicon() {
  React.useEffect(
    () => {
      const reset = changeFavicon(Favicon);

      return () => {
        reset();
      };
    },
    []
  );
}
