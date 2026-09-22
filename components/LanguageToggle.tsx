import { Languages } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAlternateLanguagePath } from '../utils/localizedRoutes';
import { rememberLanguageScroll } from '../utils/languageScroll';

export function LanguageToggle() {
  const { language, site } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const targetLanguage = language === 'en' ? 'PL' : 'EN';
  const targetLanguageCode = language === 'en' ? 'pl' : 'en';
  const targetPath = `${getAlternateLanguagePath(location.pathname)}${location.hash}`;

  const switchLanguage = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      localStorage.setItem('site-language', targetLanguageCode);
    } catch {
      // The link still works when storage is unavailable.
    }
    rememberLanguageScroll(targetPath.split('#')[0], window.scrollY);
    navigate(targetPath);
  };

  return (
    <Link
      to={targetPath}
      lang={targetLanguageCode}
      hrefLang={targetLanguageCode}
      onClick={switchLanguage}
      aria-label={site.ui.switch_language}
      title={site.ui.switch_language}
      className="group inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full px-2 text-[11px] font-semibold tracking-[0.08em] text-stone-600 transition-colors hover:bg-stone-100 hover:text-ink dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
    >
      <Languages className="hidden h-3.5 w-3.5 sm:block" strokeWidth={1.8} aria-hidden="true" />
      <span>{targetLanguage}</span>
    </Link>
  );
}
