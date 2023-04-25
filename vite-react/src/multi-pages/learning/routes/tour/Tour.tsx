import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import favicon from '@/assets/tour/img/favicon.png';
import TourHeader from './TourHeader';
import { changeFavicon } from '@/utils/page';

export default function Tour() {
  usePageTitle('✈️ 去旅行吧');
  useFavicon();

  return (
    <>
      <TourHeader />
    </>
  );
}

function useFavicon() {
  React.useEffect(
    () => {
      const reset = changeFavicon(favicon);

      return () => {
        reset();
      };
    },
    []
  );
}
