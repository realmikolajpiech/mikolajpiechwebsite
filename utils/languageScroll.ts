let pendingLanguageScroll: { pathname: string; top: number } | null = null;

export function rememberLanguageScroll(pathname: string, top: number) {
  pendingLanguageScroll = { pathname, top };
}

export function getLanguageScroll(pathname: string) {
  return pendingLanguageScroll?.pathname === pathname ? pendingLanguageScroll.top : null;
}

export function clearLanguageScroll(pathname: string) {
  if (pendingLanguageScroll?.pathname === pathname) pendingLanguageScroll = null;
}
