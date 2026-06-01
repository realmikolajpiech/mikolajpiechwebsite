export function getPortfolioScrollOffset(): number {
  if (typeof window === 'undefined') return 128;
  if (window.matchMedia('(min-width: 1024px)').matches) return 128;

  const siteNav = document.querySelector<HTMLElement>('nav.fixed');
  const mobileNav = document.querySelector<HTMLElement>('nav[aria-label="Project navigation"]');
  const siteHeight = siteNav?.offsetHeight ?? 64;
  const mobileHeight = mobileNav?.offsetHeight ?? 52;

  return siteHeight + mobileHeight + 12;
}

export function scrollToPortfolioSection(id: string) {
  if (typeof window === 'undefined') return;

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - getPortfolioScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
