export function getIsChrome() {
  const winNav = window.navigator.userAgent;

  const isIOSChrome = /CriOS/i.test(winNav);
  const isGoogleChrome = /Chrome/i.test(winNav) && !isIOSChrome;

  return isIOSChrome || isGoogleChrome;
}
