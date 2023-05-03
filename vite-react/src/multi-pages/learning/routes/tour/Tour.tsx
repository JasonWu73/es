import React from 'react';
import { useFaviconOnce, useTitle } from '@/hooks/use-page';
import favicon from '@/assets/tour/img/favicon.png';
import TourHeader from '@/multi-pages/learning/routes/tour/TourHeader';
import TourMain from '@/multi-pages/learning/routes/tour/TourMain';
import TourFooter from '@/multi-pages/learning/routes/tour/TourFooter';
import TourNavigation from '@/multi-pages/learning/routes/tour/TourNavigation';

export default function Tour() {
  useTitle('去旅行吧 🏝️');
  useFaviconOnce(favicon);

  return (
    <>
      <TourNavigation />
      <TourHeader />
      <TourMain />
      <TourFooter />
    </>
  );
}
