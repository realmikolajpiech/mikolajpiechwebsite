import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isPolish = i18n.language.startsWith('pl');

  const toggleLanguage = () => {
    const newLang = isPolish ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 text-xs font-medium tracking-wide rounded-full border border-stone-200 text-ink hover:border-stone-400 backdrop-blur-sm transition-all duration-300 bg-white/50"
      aria-label="Switch language"
    >
      {isPolish ? 'EN' : 'PL'}
    </button>
  );
};
