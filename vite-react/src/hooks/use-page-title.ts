import React from 'react';

export function usePageTitle(title: string) {
  React.useEffect(
    () => {
      document.title = title;
    },
    [title]
  );
}
