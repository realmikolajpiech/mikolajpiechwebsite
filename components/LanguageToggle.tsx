import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { getAlternateLanguagePath } from '../utils/localizedRoutes';

export function LanguageToggle() {
  const { language, site } = useLanguage();
  const location = useLocation();
  const targetLanguage = language === 'en' ? 'PL' : 'EN';
  const targetPath = `${getAlternateLanguagePath(location.pathname)}${location.hash}`;

  return (
    <Link
      to={targetPath}
      lang={language === 'en' ? 'pl' : 'en'}
      hrefLang={language === 'en' ? 'pl' : 'en'}
      aria-label={site.ui.switch_language}
      title={site.ui.switch_language}
      className="group inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full px-2 text-[11px] font-semibold tracking-[0.08em] text-stone-600 transition-colors hover:bg-stone-100 hover:text-ink dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
    >
      <Languages className="hidden h-3.5 w-3.5 sm:block" strokeWidth={1.8} aria-hidden="true" />
      <span>{targetLanguage}</span>
    </Link>
  );
}
