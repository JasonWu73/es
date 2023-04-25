import React from 'react';
import { usePageTitle } from '@/hooks/use-page-title';
import { changeFavicon } from '@/utils/page';
import favicon from '@/assets/tour/img/favicon.png';
import TourHeader from '@/multi-pages/learning/routes/tour/TourHeader';
import TourMain from '@/multi-pages/learning/routes/tour/TourMain';

export default function Tour() {
  usePageTitle('去旅行吧 🏝️');
  useFavicon();

  return (
    <div className="tour">
      <TourHeader />
      <TourMain />
    </div>
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
