import React from 'react';
import { changeFavicon, changePageTitle } from '@/utils/page';

export function useTitle(title: string) {
  React.useEffect(
    () => {
      changePageTitle(title);
    },
    [title]
  );
}

export function useFaviconOnce(favicon: string) {
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
