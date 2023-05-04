import React from 'react';

const A_ACTIVE = 'a-active';

let preAnchorEl: Element | null = null;

export function handleScrollToClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  preAnchorEl && preAnchorEl.classList.remove(A_ACTIVE);

  const anchorEl = event.target as HTMLAnchorElement;
  const href = anchorEl.getAttribute('href')!;
  const targetEl = document.querySelector(href)!;

  targetEl.scrollIntoView({ behavior: 'smooth' });

  targetEl.classList.add(A_ACTIVE);

  preAnchorEl = targetEl;
}
