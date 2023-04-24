import React from 'react';
import { changePageTitle } from '@/utils/page';

export function usePageTitle(title: string) {
  React.useEffect(
    () => {
      changePageTitle(title);
    },
    [title]
  );
}
