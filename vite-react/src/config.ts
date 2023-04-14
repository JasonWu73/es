export function getInternalApiBaseUrl() {
  return window._CONFIG?.apiBaseUrl || window.location.origin;
}
