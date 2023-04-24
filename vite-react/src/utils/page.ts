export function changePageTitle(newTitle: string) {
  return document.title = newTitle;
}

export function changeFavicon(newFaviconUrl: string) {
  let faviconLink = document.querySelector('link[rel~=\'icon\']') as HTMLLinkElement;
  const oldFaviconUrl = faviconLink?.href;

  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    document.head.appendChild(faviconLink);
  }

  faviconLink.href = newFaviconUrl;

  return () => {
    oldFaviconUrl && (faviconLink.href = oldFaviconUrl);
  };
}
