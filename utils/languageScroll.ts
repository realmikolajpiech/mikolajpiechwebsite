let pendingLanguageScroll: { pathname: string; top: number } | null = null;
const storageKey = 'site-language-scroll';

export function rememberLanguageScroll(pathname: string, top: number) {
  pendingLanguageScroll = { pathname, top };
  try { sessionStorage.setItem(storageKey, JSON.stringify(pendingLanguageScroll)); } catch { /* Storage may be disabled. */ }
}

export function getLanguageScroll(pathname: string) {
  let pending = pendingLanguageScroll;
  if (!pending) {
    try { pending = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null'); } catch { /* Storage may be disabled. */ }
  }
  return pending?.pathname === pathname && Number.isFinite(pending.top) && pending.top >= 0 ? pending.top : null;
}

export function clearLanguageScroll(pathname: string) {
  if (pendingLanguageScroll?.pathname === pathname) pendingLanguageScroll = null;
  try {
    const pending = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
    if (pending?.pathname === pathname) sessionStorage.removeItem(storageKey);
  } catch { /* Storage may be disabled. */ }
}
